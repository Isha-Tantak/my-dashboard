// prisma/seed.js
const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");

const prisma = new PrismaClient();

function safeNumberLong(obj) {
  if (!obj && obj !== 0) return null;
  if (typeof obj === "object" && obj["$numberLong"]) return parseInt(obj["$numberLong"], 10);
  if (typeof obj === "number") return obj;
  if (!isNaN(Number(obj))) return Number(obj);
  return null;
}

function safeDate(obj) {
  if (!obj) return null;
  if (typeof obj === "object" && obj["$date"]) return new Date(obj["$date"]);
  if (typeof obj === "string" && obj.trim() !== "") return new Date(obj);
  return null;
}

async function main() {
  const filePath = path.resolve(process.cwd(), "Analytics_Test_Data.json");
  if (!fs.existsSync(filePath)) {
    console.error("❌ Analytics_Test_Data.json not found at:", filePath);
    process.exit(1);
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const docs = JSON.parse(raw);
  console.log(`📄 Found ${Array.isArray(docs) ? docs.length : 0} documents in JSON`);

  const defaultVendor = await prisma.vendor.upsert({
    where: { externalId: "default_vendor" },
    update: {},
    create: { externalId: "default_vendor", name: "Default Vendor", address: "Unknown" },
  });

  for (const d of docs) {
    try {
      // --- Document ---
      let analyticsId = d.analyticsId ?? null;
      const fileName = d.name ?? "unknown";
      const filePathUrl = d.filePath ?? null;
      const fileSize = safeNumberLong(d.fileSize);
      const fileType = d.fileType ?? null;
      const status = d.status ?? null;
      const processedAt = safeDate(d.processedAt?.["$date"] ?? d.processedAt);

      // ✅ Ensure analyticsId is unique
      if (!analyticsId || typeof analyticsId !== "string" || analyticsId.trim() === "") {
        analyticsId = `auto_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
      } else {
        const existing = await prisma.document.findUnique({ where: { analyticsId } });
        if (existing) {
          analyticsId = `${analyticsId}_${Math.random().toString(36).substring(2, 6)}`;
        }
      }

      const doc = await prisma.document.create({
        data: { analyticsId, fileName, filePath: filePathUrl, fileSize, fileType, status, processedAt },
      });

      const llm = d.extractedData?.llmData ?? d.extractedData ?? null;
      if (!llm) continue;

      // --- Vendor ---
      let vendor = defaultVendor;
      const vendorObj = llm.vendor?.value ?? llm.vendor ?? null;
      if (vendorObj) {
        const vendorName = vendorObj.vendorName?.value ?? vendorObj.vendorName ?? null;
        const vendorAddress = vendorObj.vendorAddress?.value ?? vendorObj.vendorAddress ?? null;
        const vendorTaxId = vendorObj.vendorTaxId?.value ?? vendorObj.vendorTaxId ?? null;
        const vendorUnique = vendorTaxId || vendorName || "default_vendor";

        vendor = await prisma.vendor.upsert({
          where: { externalId: vendorUnique },
          update: { name: vendorName ?? vendorUnique, address: vendorAddress, taxId: vendorTaxId },
          create: { externalId: vendorUnique, name: vendorName ?? vendorUnique, address: vendorAddress, taxId: vendorTaxId },
        });
      }

      // --- Customer ---
      let customer = null;
      const custObj = llm.customer?.value ?? llm.customer ?? null;
      if (custObj) {
        const custName = custObj.customerName?.value ?? custObj.customerName ?? "Unknown Customer";
        const custAddress = custObj.customerAddress?.value ?? custObj.customerAddress ?? null;
        const custUnique = custName || `cust_${Math.random().toString(36).substring(2, 6)}`;

        customer = await prisma.customer.upsert({
          where: { externalId: custUnique },
          update: { name: custName, address: custAddress },
          create: { externalId: custUnique, name: custName, address: custAddress },
        });
      }

      // --- Invoice ---
      const summary = llm.summary?.value ?? llm.summary ?? {};
      const invoiceBlock = llm.invoice?.value ?? llm.invoice ?? {};
      const invoiceNumber = invoiceBlock?.invoiceId?.value ?? invoiceBlock?.invoiceId ?? summary?.invoiceId ?? null;
      const invoiceDateStr = invoiceBlock?.invoiceDate?.value ?? invoiceBlock?.invoiceDate ?? null;
      const deliveryDateStr = invoiceBlock?.deliveryDate?.value ?? invoiceBlock?.deliveryDate ?? null;

      // ✅ Ensure invoice.externalId is unique
      let externalId = d._id ?? null;
      if (!externalId || typeof externalId !== "string") {
        externalId = `inv_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
      } else {
        const existingInvoice = await prisma.invoice.findUnique({ where: { externalId } });
        if (existingInvoice) {
          externalId = `${externalId}_${Math.random().toString(36).substring(2, 6)}`;
        }
      }

      const invoice = await prisma.invoice.create({
        data: {
          externalId,
          invoiceNumber: invoiceNumber ?? undefined,
          invoiceDate: invoiceDateStr ? new Date(invoiceDateStr) : undefined,
          deliveryDate: deliveryDateStr ? new Date(deliveryDateStr) : undefined,
          vendorId: vendor.id,
          customerId: customer ? customer.id : null,
          subTotal:
            typeof summary?.subTotal?.value === "number"
              ? summary.subTotal.value
              : typeof summary?.subTotal === "number"
              ? summary.subTotal
              : null,
          totalTax:
            typeof summary?.totalTax?.value === "number"
              ? summary.totalTax.value
              : typeof summary?.totalTax === "number"
              ? summary.totalTax
              : null,
          invoiceTotal:
            typeof summary?.invoiceTotal?.value === "number"
              ? summary.invoiceTotal.value
              : typeof summary?.invoiceTotal === "number"
              ? summary.invoiceTotal
              : null,
          currency: summary?.currencySymbol?.value ?? summary?.currencySymbol ?? null,
          status: d.validatedData?.status ?? d.status ?? null,
          documentId: doc.id,
        },
      });

      // --- Payment ---
      const paymentObj = llm.payment?.value ?? llm.payment ?? null;
      if (paymentObj) {
        const due = paymentObj.dueDate?.value ?? paymentObj.dueDate ?? null;
        const amount = paymentObj.discountedTotal?.value ?? paymentObj.discountedTotal ?? null;
        const bankAccount =
          paymentObj.bankAccountNumber?.value ??
          paymentObj.bankAccountNumber ??
          paymentObj.bankAccount ??
          null;

        await prisma.payment.create({
          data: {
            invoiceId: invoice.id,
            dueDate: due ? new Date(due) : null,
            amount: amount ? Number(amount) : 0,
            bankAccount: bankAccount ?? null,
          },
        });
      }

      console.log(`✅ Inserted document ${doc.id} → invoice ${invoice.id}`);
    } catch (err) {
      console.error("❌ Error processing record:", err?.message || err);
    }
  }

  console.log("🌱 Seeding finished successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Fatal error in seed:", e?.message || e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
