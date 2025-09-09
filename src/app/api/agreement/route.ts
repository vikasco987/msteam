// // src/app/api/agreement/route.ts
// import { NextResponse } from "next/server";
// import PDFDocument from "pdfkit";
// import fs from "fs";
// import path from "path";
// import { Buffer } from "buffer";

// export const runtime = "nodejs"; // force Node.js runtime

// export async function POST(req: Request) {
//   try {
//     const { clientName, startDate, endDate, fee, targetSales } = await req.json();

//     // Load custom font
//     const fontPath = path.join(process.cwd(), "public/fonts/Arial.ttf");
//     if (!fs.existsSync(fontPath)) {
//       throw new Error("Font file not found at " + fontPath);
//     }

//     const doc = new PDFDocument({ font: fontPath });
//     const buffers: Buffer[] = [];

//     doc.on("data", (chunk) => buffers.push(chunk));

//     doc.fontSize(18).text(`Agreement between Magic Scale and ${clientName}`, { align: "center" });
//     doc.moveDown();
//     doc.fontSize(12).text(`Start Date: ${startDate}`);
//     doc.text(`End Date: ${endDate}`);
//     doc.text(`Fee: INR ${fee}`);
//     doc.text(`Target Sales: ${targetSales}`);
//     doc.moveDown();
//     doc.text("Thank you for doing business with us!", { align: "center" });

//     doc.end();

//     await new Promise<void>((resolve) => doc.on("end", () => resolve()));

//     const pdfBytes = Buffer.concat(buffers);
//     const filename = `${clientName}-agreement.pdf`;

//     return new NextResponse(pdfBytes, {
//       headers: {
//         "Content-Type": "application/pdf",
//         "Content-Disposition": `attachment; filename="${filename}"`,
//       },
//     });
//   } catch (err) {
//     console.error("PDF generation failed:", err);
//     return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 });
//   }
// }




// // src/app/api/agreement/route.ts
// import { NextResponse } from "next/server";
// import PDFDocument from "pdfkit";
// import fs from "fs";
// import path from "path";
// import { Buffer } from "buffer";

// export const runtime = "nodejs";

// export async function POST(req: Request) {
//   try {
//     const {
//       clientName,
//       clientAddress,
//       startDate,
//       endDate,
//       fee,
//       targetSales,
//     } = await req.json();

//     // ✅ Use Arial.ttf
//     const fontPath = path.join(process.cwd(), "public/fonts/Arial.ttf");
//     if (!fs.existsSync(fontPath)) {
//       throw new Error("Font file not found at " + fontPath);
//     }

//     const buffers: Buffer[] = [];
//     const doc = new PDFDocument({
//       margin: 50,
//       font: fontPath,
//     });

//     doc.on("data", (chunk) => buffers.push(chunk));
//     doc.registerFont("Arial", fontPath);
//     doc.font("Arial");

//     // -------------------------
//     // AGREEMENT CONTENT
//     // -------------------------
//     doc.fontSize(20).text("SERVICE AGREEMENT", { align: "center" });
//     doc.moveDown(2);

//     doc.fontSize(12).text(
//       `This Agreement is made and entered into on this ${startDate} To ${endDate} Between
// Magic Scale Restaurant Consultant, a [Proprietorship] having its registered office at [Near Air Force Camp , Rajokari , 110038] 
// hereinafter referred to as "Consultant," represented by [Akash Verma as Sales Manager],
// AND
// ${clientName}, a [Proprietorship] having its registered office at ${clientAddress}.`
//     );

//     doc.moveDown();
//     doc.text(
//       `WHEREAS:
// The Client operates a restaurant known as ${clientName}. The Client desires to improve its business performance and has engaged the Consultant to provide consulting services. The Consultant has agreed to provide such services on the terms and conditions set forth herein.`
//     );

//     doc.moveDown();
//     doc.text(
//       "NOW, Therefore, in consideration of the mutual covenants and promises contained herein, the parties agree as follows:"
//     );

//     doc.moveDown();
//     doc.font("Arial-Bold").text("1. Growth Target:");
//     doc.font("Arial").text(
//       `The Consultant will assist the Client in achieving a sales target of ${targetSales} in Swiggy and Zomato Marketplace, compared to the previous month's sales figures. This target will be assessed based on the Client's reported sales data. The Consultant will provide recommendations and support to achieve this target. If food quality is not maintained, and customer complaints are high, then the Consultant is not responsible for the target.`
//     );
//     doc.text("ADS budget will be INR 1500 per week.");

//     doc.moveDown();
//     doc.font("Arial-Bold").text("2. One Month Account Handling Charges:");
//     doc.font("Arial").text(
//       `The Client agrees to pay the Consultant a one-month account handling fee of INR ${fee} (Seven Thousand Only).`
//     );

//     doc.moveDown();
//     doc.font("Arial-Bold").text("3. Term and Termination:");
//     doc.font("Arial").text(
//       `This Agreement shall be valid for a period commencing on ${startDate} and ending on ${endDate}. This agreement may be terminated by either party with 15 days written notice.`
//     );

//     doc.moveDown();
//     doc.font("Arial-Bold").text("4. Scope of Services:");
//     doc.font("Arial").text("The Consultant's services may include, but are not limited to:");
//     doc.list([
//       "Menu analysis and recommendations",
//       "Marketing and promotional strategies",
//       "Operational efficiency improvements",
//       "Cost control measures",
//     ]);
//     doc.text(
//       "The specific scope of services will be mutually agreed upon and may be adjusted from time to time based on the Client's needs and progress towards the growth target."
//     );

//     doc.moveDown();
//     doc.font("Arial-Bold").text("5. Confidentiality:");
//     doc.font("Arial").text(
//       "Both parties agree to keep confidential any and all information shared during the course of this engagement."
//     );

//     doc.moveDown();
//     doc.font("Arial-Bold").text("6. Entire Agreement:");
//     doc.font("Arial").text(
//       "This Agreement constitutes the entire understanding between the parties and supersedes all prior negotiations and agreements, whether written or oral."
//     );

//     doc.moveDown(2);
//     doc.font("Arial-Bold").text("Magic Scale Restaurant Consultant");
//     doc.text("By: Akash Verma, Manager");

//     doc.moveDown();
//     doc.font("Arial-Bold").text(`${clientName}`);
//     doc.text("By: Authorized Signatory");

//     // Footer contact block
//     doc.moveDown(2);
//     doc.fontSize(10).text("Magic Scale", { continued: true }).text(" ");
//     doc.text("Near Air Force Camp, Rajokari , 110038");
//     doc.text("+91 9311330885");
//     doc.text("https://magicscale.in");

//     doc.end();

//     await new Promise<void>((resolve) => doc.on("end", () => resolve()));

//     const pdfBytes = Buffer.concat(buffers);
//     const filename = `${clientName}-agreement.pdf`;

//     return new NextResponse(pdfBytes, {
//       headers: {
//         "Content-Type": "application/pdf",
//         "Content-Disposition": `attachment; filename="${filename}"`,
//       },
//     });
//   } catch (err) {
//     console.error("PDF generation failed:", err);
//     return NextResponse.json(
//       { error: "Failed to generate PDF", details: (err as Error).message },
//       { status: 500 }
//     );
//   }
// }



// // src/app/api/agreement/route.ts
// import { NextResponse } from "next/server";
// import PDFDocument from "pdfkit";
// import fs from "fs";
// import path from "path";
// import { Buffer } from "buffer";

// export const runtime = "nodejs";

// export async function POST(req: Request) {
//   try {
//     const {
//       clientName,
//       clientAddress,
//       startDate,
//       endDate,
//       fee,
//       targetSales,
//     } = await req.json();

//     // ✅ Fonts folder path
//     const fontsPath = path.join(process.cwd(), "public", "fonts");

//     const arialPath = path.join(fontsPath, "Arial.ttf");
//     const arialBoldPath = path.join(fontsPath, "Arial-Bold.ttf");

//     if (!fs.existsSync(arialPath)) {
//       throw new Error("Font file not found at " + arialPath);
//     }
//     if (!fs.existsSync(arialBoldPath)) {
//       throw new Error("Font file not found at " + arialBoldPath);
//     }

//     const buffers: Buffer[] = [];
//     const doc = new PDFDocument({
//       margin: 50,
//     });

//     doc.on("data", (chunk) => buffers.push(chunk));

//     // ✅ Register fonts
//     doc.registerFont("Arial", arialPath);
//     doc.registerFont("Arial-Bold", arialBoldPath);

//     // ✅ Set default font immediately (prevents Helvetica.afm error)
//     doc.font("Arial");

//     // -------------------------
//     // AGREEMENT CONTENT
//     // -------------------------
//     doc.font("Arial-Bold").fontSize(20).text("SERVICE AGREEMENT", {
//       align: "center",
//     });
//     doc.moveDown(2);

//     doc.font("Arial").fontSize(12).text(
//       `This Agreement is made and entered into on this ${startDate} To ${endDate} Between
// Magic Scale Restaurant Consultant, a [Proprietorship] having its registered office at [Near Air Force Camp , Rajokari , 110038] 
// hereinafter referred to as "Consultant," represented by [Akash Verma as Sales Manager],
// AND
// ${clientName}, a [Proprietorship] having its registered office at ${clientAddress}.`
//     );

//     doc.moveDown();
//     doc.text(
//       `WHEREAS:
// The Client operates a restaurant known as ${clientName}. The Client desires to improve its business performance and has engaged the Consultant to provide consulting services. The Consultant has agreed to provide such services on the terms and conditions set forth herein.`
//     );

//     doc.moveDown();
//     doc.text(
//       "NOW, Therefore, in consideration of the mutual covenants and promises contained herein, the parties agree as follows:"
//     );

//     // Section 1
//     doc.moveDown();
//     doc.font("Arial-Bold").text("1. Growth Target:");
//     doc.font("Arial").text(
//       `The Consultant will assist the Client in achieving a sales target of ${targetSales} in Swiggy and Zomato Marketplace, compared to the previous month's sales figures. This target will be assessed based on the Client's reported sales data. The Consultant will provide recommendations and support to achieve this target. If food quality is not maintained, and customer complaints are high, then the Consultant is not responsible for the target.`
//     );
//     doc.text("ADS budget will be INR 1500 per week.");

//     // Section 2
//     doc.moveDown();
//     doc.font("Arial-Bold").text("2. One Month Account Handling Charges:");
//     doc.font("Arial").text(
//       `The Client agrees to pay the Consultant a one-month account handling fee of INR ${fee} (Seven Thousand Only).`
//     );

//     // Section 3
//     doc.moveDown();
//     doc.font("Arial-Bold").text("3. Term and Termination:");
//     doc.font("Arial").text(
//       `This Agreement shall be valid for a period commencing on ${startDate} and ending on ${endDate}. This agreement may be terminated by either party with 15 days written notice.`
//     );

//     // Section 4
//     doc.moveDown();
//     doc.font("Arial-Bold").text("4. Scope of Services:");
//     doc.font("Arial").text("The Consultant's services may include, but are not limited to:");
//     doc.list([
//       "Menu analysis and recommendations",
//       "Marketing and promotional strategies",
//       "Operational efficiency improvements",
//       "Cost control measures",
//     ]);
//     doc.text(
//       "The specific scope of services will be mutually agreed upon and may be adjusted from time to time based on the Client's needs and progress towards the growth target."
//     );

//     // Section 5
//     doc.moveDown();
//     doc.font("Arial-Bold").text("5. Confidentiality:");
//     doc.font("Arial").text(
//       "Both parties agree to keep confidential any and all information shared during the course of this engagement."
//     );

//     // Section 6
//     doc.moveDown();
//     doc.font("Arial-Bold").text("6. Entire Agreement:");
//     doc.font("Arial").text(
//       "This Agreement constitutes the entire understanding between the parties and supersedes all prior negotiations and agreements, whether written or oral."
//     );

//     // Signature section
//     doc.moveDown(2);
//     doc.font("Arial-Bold").text("Magic Scale Restaurant Consultant");
//     doc.font("Arial").text("By: Akash Verma, Manager");

//     doc.moveDown();
//     doc.font("Arial-Bold").text(`${clientName}`);
//     doc.font("Arial").text("By: Authorized Signatory");

//     // Footer
//     doc.moveDown(2);
//     doc.fontSize(10).font("Arial-Bold").text("Magic Scale");
//     doc.font("Arial").text("Near Air Force Camp, Rajokari , 110038");
//     doc.text("+91 9311330885");
//     doc.text("https://magicscale.in");

//     doc.end();

//     await new Promise<void>((resolve) => doc.on("end", () => resolve()));

//     const pdfBytes = Buffer.concat(buffers);
//     const filename = `${clientName}-agreement.pdf`;

//     return new NextResponse(pdfBytes, {
//       headers: {
//         "Content-Type": "application/pdf",
//         "Content-Disposition": `attachment; filename="${filename}"`,
//       },
//     });
//   } catch (err) {
//     console.error("PDF generation failed:", err);
//     return NextResponse.json(
//       { error: "Failed to generate PDF", details: (err as Error).message },
//       { status: 500 }
//     );
//   }
// }







// // src/app/api/agreement/route.ts
// import { NextResponse } from "next/server";
// import PDFDocument from "pdfkit";
// import fs from "fs";
// import path from "path";
// import { Buffer } from "buffer";

// export const runtime = "nodejs";

// export async function POST(req: Request) {
//   try {
//     const { clientName, clientAddress, startDate, endDate, fee, targetSales } =
//       await req.json();

//     // ✅ Fonts folder path
//     const fontsPath = path.join(process.cwd(), "public", "fonts");
//     const arialPath = path.join(fontsPath, "Arial.ttf");
//     const arialBoldPath = path.join(fontsPath, "Arial-Bold.ttf");

//     if (!fs.existsSync(arialPath)) {
//       throw new Error("Font file not found at " + arialPath);
//     }
//     if (!fs.existsSync(arialBoldPath)) {
//       throw new Error("Font file not found at " + arialBoldPath);
//     }

//     const buffers: Buffer[] = [];

//     // ✅ Pass font in constructor to prevent default Helvetica.afm error
//     const doc = new PDFDocument({
//       margin: 50,
//       font: arialPath,
//     });

//     doc.on("data", (chunk) => buffers.push(chunk));

//     // ✅ Register both fonts
//     doc.registerFont("Arial", arialPath);
//     doc.registerFont("Arial-Bold", arialBoldPath);

//     // -------------------------
//     // AGREEMENT CONTENT
//     // -------------------------
//     doc.font("Arial-Bold").fontSize(20).text("SERVICE AGREEMENT", {
//       align: "center",
//     });
//     doc.moveDown(2);

//     doc.font("Arial").fontSize(12).text(
//       `This Agreement is made and entered into on this ${startDate} To ${endDate} Between
// Magic Scale Restaurant Consultant, a [Proprietorship] having its registered office at [Near Air Force Camp , Rajokari , 110038] 
// hereinafter referred to as "Consultant," represented by [Akash Verma as Sales Manager],
// AND
// ${clientName}, a [Proprietorship] having its registered office at ${clientAddress}.`
//     );

//     doc.moveDown();
//     doc.text(
//       `WHEREAS:
// The Client operates a restaurant known as ${clientName}. The Client desires to improve its business performance and has engaged the Consultant to provide consulting services. The Consultant has agreed to provide such services on the terms and conditions set forth herein.`
//     );

//     doc.moveDown();
//     doc.text(
//       "NOW, Therefore, in consideration of the mutual covenants and promises contained herein, the parties agree as follows:"
//     );

//     // Section 1
//     doc.moveDown();
//     doc.font("Arial-Bold").text("1. Growth Target:");
//     doc.font("Arial").text(
//       `The Consultant will assist the Client in achieving a sales target of ${targetSales} in Swiggy and Zomato Marketplace, compared to the previous month's sales figures. This target will be assessed based on the Client's reported sales data. The Consultant will provide recommendations and support to achieve this target. If food quality is not maintained, and customer complaints are high, then the Consultant is not responsible for the target.`
//     );
//     doc.text("ADS budget will be INR 1500 per week.");

//     // Section 2
//     doc.moveDown();
//     doc.font("Arial-Bold").text("2. One Month Account Handling Charges:");
//     doc.font("Arial").text(
//       `The Client agrees to pay the Consultant a one-month account handling fee of INR ${fee} (Seven Thousand Only).`
//     );

//     // Section 3
//     doc.moveDown();
//     doc.font("Arial-Bold").text("3. Term and Termination:");
//     doc.font("Arial").text(
//       `This Agreement shall be valid for a period commencing on ${startDate} and ending on ${endDate}. This agreement may be terminated by either party with 15 days written notice.`
//     );

//     // Section 4
//     doc.moveDown();
//     doc.font("Arial-Bold").text("4. Scope of Services:");
//     doc.font("Arial").text("The Consultant's services may include, but are not limited to:");
//     doc.list([
//       "Menu analysis and recommendations",
//       "Marketing and promotional strategies",
//       "Operational efficiency improvements",
//       "Cost control measures",
//     ]);
//     doc.text(
//       "The specific scope of services will be mutually agreed upon and may be adjusted from time to time based on the Client's needs and progress towards the growth target."
//     );

//     // Section 5
//     doc.moveDown();
//     doc.font("Arial-Bold").text("5. Confidentiality:");
//     doc.font("Arial").text(
//       "Both parties agree to keep confidential any and all information shared during the course of this engagement."
//     );

//     // Section 6
//     doc.moveDown();
//     doc.font("Arial-Bold").text("6. Entire Agreement:");
//     doc.font("Arial").text(
//       "This Agreement constitutes the entire understanding between the parties and supersedes all prior negotiations and agreements, whether written or oral."
//     );

//     // Signature section
//     doc.moveDown(2);
//     doc.font("Arial-Bold").text("Magic Scale Restaurant Consultant");
//     doc.font("Arial").text("By: Akash Verma, Manager");

//     doc.moveDown();
//     doc.font("Arial-Bold").text(`${clientName}`);
//     doc.font("Arial").text("By: Authorized Signatory");

//     // Footer
//     doc.moveDown(2);
//     doc.fontSize(10).font("Arial-Bold").text("Magic Scale");
//     doc.font("Arial").text("Near Air Force Camp, Rajokari , 110038");
//     doc.text("+91 9311330885");
//     doc.text("https://magicscale.in");

//     doc.end();

//     await new Promise<void>((resolve) => doc.on("end", () => resolve()));

//     const pdfBytes = Buffer.concat(buffers);
//     const filename = `${clientName}-agreement.pdf`;

//     return new NextResponse(pdfBytes, {
//       headers: {
//         "Content-Type": "application/pdf",
//         "Content-Disposition": `attachment; filename="${filename}"`,
//       },
//     });
//   } catch (err) {
//     console.error("PDF generation failed:", err);
//     return NextResponse.json(
//       { error: "Failed to generate PDF", details: (err as Error).message },
//       { status: 500 }
//     );
//   }
// }














// // src/app/api/agreement/route.ts
// import { NextResponse } from "next/server";
// import PDFDocument from "pdfkit";
// import fs from "fs";
// import path from "path";
// import { Buffer } from "buffer";

// export const runtime = "nodejs";

// export async function POST(req: Request) {
//   try {
//     const {
//       clientName,
//       clientAddress,
//       startDate,
//       endDate,
//       fee,
//       targetSales,
//     } = await req.json();

//     // ✅ Fonts
//     const fontsPath = path.join(process.cwd(), "public", "fonts");
//     const arialPath = path.join(fontsPath, "Arial.ttf");
//     const arialBoldPath = path.join(fontsPath, "Arial-Bold.ttf");

//     if (!fs.existsSync(arialPath) || !fs.existsSync(arialBoldPath)) {
//       throw new Error("Arial fonts missing in /public/fonts");
//     }

//     const buffers: Buffer[] = [];
//     const doc = new PDFDocument({ margin: 50, font: arialPath });
//     doc.on("data", (chunk) => buffers.push(chunk));
//     doc.on("end", () => console.log("PDF generated ✅"));

//     // Register fonts
//     doc.registerFont("Arial", arialPath);
//     doc.registerFont("Arial-Bold", arialBoldPath);

//     // ---------------- HEADER ----------------
//     doc.font("Arial-Bold").fontSize(22).text(clientName, { align: "center" });
//     doc.moveDown(1);
//     doc.font("Arial").fontSize(12).text(`[${clientName}]`, { align: "center" });
//     doc.moveDown(2);

//     // ---------------- AGREEMENT INTRO ----------------
//     doc.font("Arial").fontSize(12).text(
//       `This Agreement is made and entered into on this ${startDate} To ${endDate} Between
// Magic Scale Restaurant Consultant, a [Proprietorship] having its registered office at [Near Air Force Camp, Rajokari, 110038],
// hereinafter referred to as "Consultant," represented by [Akash Verma as Sales Manager],

// AND

// ${clientName}, a [Proprietorship] having its registered office at ${clientAddress}.`
//     );
//     doc.moveDown();

//     doc.text(
//       `WHEREAS: The Client operates a restaurant known as ${clientName}. The Client desires to improve its business performance and has engaged the Consultant to provide consulting services. The Consultant has agreed to provide such services on the terms and conditions set forth herein.`
//     );
//     doc.moveDown();
//     doc.text(
//       "NOW, Therefore, in consideration of the mutual covenants and promises contained herein, the parties agree as follows:"
//     );

//     // ---------------- SECTIONS ----------------
//     doc.moveDown(2);

//     // Section 1
//     doc.font("Arial-Bold").text("1. Growth Target:");
//     doc.font("Arial").text(
//       `The Consultant will assist the Client in achieving a sales target of ${targetSales} in Swiggy and Zomato Marketplace, compared to the previous month's sales figures. This target will be assessed based on the Client's reported sales data. The Consultant will provide recommendations and support to achieve this target. If food quality is not maintained, and customer complaints are high, then the Consultant is not responsible for the target.`
//     );
//     doc.text("ADS budget will be INR 1500 per week.");
//     doc.moveDown();

//     // Section 2
//     doc.font("Arial-Bold").text("2. One Month Account Handling Charges:");
//     doc.font("Arial").text(
//       `The Client agrees to pay the Consultant a one-month account handling fee of INR ${fee} (Seven Thousand Only).`
//     );
//     doc.moveDown();

//     // Section 3
//     doc.font("Arial-Bold").text("3. Term and Termination:");
//     doc.font("Arial").text(
//       `This Agreement shall be valid for a period commencing on ${startDate} and ending on ${endDate}. This agreement may be terminated by either party with 15 days written notice.`
//     );
//     doc.moveDown();

//     // Section 4
//     doc.font("Arial-Bold").text("4. Scope of Services:");
//     doc.font("Arial").text("The Consultant's services may include, but are not limited to:");
//     doc.list([
//       "Menu analysis and recommendations",
//       "Marketing and promotional strategies",
//       "Operational efficiency improvements",
//       "Cost control measures",
//     ]);
//     doc.text(
//       "The specific scope of services will be mutually agreed upon and may be adjusted from time to time based on the Client's needs and progress towards the growth target."
//     );
//     doc.moveDown();

//     // Section 5
//     doc.font("Arial-Bold").text("5. Confidentiality:");
//     doc.font("Arial").text(
//       "Both parties agree to keep confidential any and all information shared during the course of this engagement."
//     );
//     doc.moveDown();

//     // Section 6
//     doc.font("Arial-Bold").text("6. Entire Agreement:");
//     doc.font("Arial").text(
//       "This Agreement constitutes the entire understanding between the parties and supersedes all prior negotiations and agreements, whether written or oral."
//     );

//     // ---------------- SIGNATURES ----------------
//     doc.moveDown(3);
//     doc.font("Arial-Bold").text("Magic Scale Restaurant Consultant");
//     doc.font("Arial").text("By: Akash Verma, Manager");
//     doc.moveDown(2);
//     doc.font("Arial-Bold").text(clientName);
//     doc.font("Arial").text("By: Authorized Signatory");

//     // ---------------- FOOTER ----------------
//     doc.moveDown(3);
//     doc.fontSize(10).font("Arial-Bold").text("Magic Scale", { align: "center" });
//     doc.font("Arial").text("Near Air Force Camp, Rajokari, 110038", {
//       align: "center",
//     });
//     doc.text("+91 9311330885", { align: "center" });
//     doc.text("https://magicscale.in", { align: "center" });

//     // End PDF
//     doc.end();
//     await new Promise<void>((resolve) => doc.on("end", () => resolve()));

//     const pdfBytes = Buffer.concat(buffers);
//     const filename = `${clientName}-agreement.pdf`;

//     return new NextResponse(pdfBytes, {
//       headers: {
//         "Content-Type": "application/pdf",
//         "Content-Disposition": `attachment; filename="${filename}"`,
//       },
//     });
//   } catch (err) {
//     console.error("PDF generation failed:", err);
//     return NextResponse.json(
//       { error: "Failed to generate PDF", details: (err as Error).message },
//       { status: 500 }
//     );
//   }
// }




// // src/app/api/agreement/route.ts
// import { NextResponse } from "next/server";
// import PDFDocument from "pdfkit";
// import fs from "fs";
// import path from "path";
// import { Buffer } from "buffer";

// export const runtime = "nodejs";

// export async function POST(req: Request) {
//   try {
//     const { clientName, clientAddress, startDate, endDate, fee, targetSales } = await req.json();

//     // -------------------- FONT PATHS --------------------
//     const fontsPath = path.join(process.cwd(), "public", "fonts");
//     const arialPath = path.join(fontsPath, "Arial.ttf");
//     const arialBoldPath = path.join(fontsPath, "Arial-Bold.ttf");

//     if (!fs.existsSync(arialPath) || !fs.existsSync(arialBoldPath)) {
//       throw new Error("Arial fonts missing in /public/fonts");
//     }

//     // -------------------- PDF SETUP --------------------
//     const buffers: Buffer[] = [];
//     const doc = new PDFDocument({
//       margin: 50,
//       size: "A4",
//       font: arialPath, // ✅ Set custom font to avoid Helvetica error
//     });
//     doc.on("data", (chunk) => buffers.push(chunk));
//     doc.on("end", () => console.log("PDF generated ✅"));

//     // -------------------- REGISTER FONTS --------------------
//     doc.registerFont("Arial", arialPath);
//     doc.registerFont("Arial-Bold", arialBoldPath);
//     doc.font("Arial"); // default font

//     // -------------------- BACKGROUND COLOR --------------------
//     doc.rect(0, 0, doc.page.width, doc.page.height).fill("#f5f5f5"); // light gray background
//     doc.fillColor("black"); // reset text color

//     // -------------------- HEADER --------------------
//     doc.font("Arial-Bold").fontSize(22).text(clientName, { align: "center" });
//     doc.moveDown(1);
//     doc.font("Arial").fontSize(12).text(`[${clientName}]`, { align: "center" });
//     doc.moveDown(2);

//     // -------------------- AGREEMENT INTRO --------------------
//     doc.font("Arial").fontSize(12).text(
//       `This Agreement is made and entered into on this ${startDate} To ${endDate} Between
// Magic Scale Restaurant Consultant, a [Proprietorship] having its registered office at [Near Air Force Camp, Rajokari, 110038],
// hereinafter referred to as "Consultant," represented by [Akash Verma as Sales Manager],

// AND

// ${clientName}, a [Proprietorship] having its registered office at ${clientAddress}.`
//     );
//     doc.moveDown();

//     doc.text(
//       `WHEREAS: The Client operates a restaurant known as ${clientName}. The Client desires to improve its business performance and has engaged the Consultant to provide consulting services. The Consultant has agreed to provide such services on the terms and conditions set forth herein.`
//     );
//     doc.moveDown();
//     doc.text(
//       "NOW, Therefore, in consideration of the mutual covenants and promises contained herein, the parties agree as follows:"
//     );

//     // -------------------- SECTIONS --------------------
//     doc.moveDown(2);
//     doc.font("Arial-Bold").text("1. Growth Target:");
//     doc.font("Arial").text(
//       `The Consultant will assist the Client in achieving a sales target of ${targetSales} in Swiggy and Zomato Marketplace, compared to the previous month's sales figures. This target will be assessed based on the Client's reported sales data. The Consultant will provide recommendations and support to achieve this target. If food quality is not maintained, and customer complaints are high, then the Consultant is not responsible for the target.`
//     );
//     doc.text("ADS budget will be INR 1500 per week.");
//     doc.moveDown();

//     doc.font("Arial-Bold").text("2. One Month Account Handling Charges:");
//     doc.font("Arial").text(
//       `The Client agrees to pay the Consultant a one-month account handling fee of INR ${fee} (Seven Thousand Only).`
//     );
//     doc.moveDown();

//     doc.font("Arial-Bold").text("3. Term and Termination:");
//     doc.font("Arial").text(
//       `This Agreement shall be valid for a period commencing on ${startDate} and ending on ${endDate}. This agreement may be terminated by either party with 15 days written notice.`
//     );
//     doc.moveDown();

//     doc.font("Arial-Bold").text("4. Scope of Services:");
//     doc.font("Arial").text("The Consultant's services may include, but are not limited to:");
//     doc.list([
//       "Menu analysis and recommendations",
//       "Marketing and promotional strategies",
//       "Operational efficiency improvements",
//       "Cost control measures",
//     ]);
//     doc.text(
//       "The specific scope of services will be mutually agreed upon and may be adjusted from time to time based on the Client's needs and progress towards the growth target."
//     );
//     doc.moveDown();

//     doc.font("Arial-Bold").text("5. Confidentiality:");
//     doc.font("Arial").text(
//       "Both parties agree to keep confidential any and all information shared during the course of this engagement."
//     );
//     doc.moveDown();

//     doc.font("Arial-Bold").text("6. Entire Agreement:");
//     doc.font("Arial").text(
//       "This Agreement constitutes the entire understanding between the parties and supersedes all prior negotiations and agreements, whether written or oral."
//     );

//     // -------------------- SIGNATURES --------------------
//     doc.moveDown(3);
//     doc.font("Arial-Bold").text("Magic Scale Restaurant Consultant");
//     doc.font("Arial").text("By: Akash Verma, Manager");
//     doc.moveDown(2);
//     doc.font("Arial-Bold").text(clientName);
//     doc.font("Arial").text("By: Authorized Signatory");

//     // -------------------- FOOTER --------------------
//     doc.moveDown(3);
//     doc.fontSize(10).font("Arial-Bold").text("Magic Scale", { align: "center" });
//     doc.font("Arial").text("Near Air Force Camp, Rajokari, 110038", { align: "center" });
//     doc.text("+91 9311330885", { align: "center" });
//     doc.text("https://magicscale.in", { align: "center" });

//     doc.end();
//     await new Promise<void>((resolve) => doc.on("end", () => resolve()));

//     const pdfBytes = Buffer.concat(buffers);
//     const filename = `${clientName}-agreement.pdf`;

//     return new NextResponse(pdfBytes, {
//       headers: {
//         "Content-Type": "application/pdf",
//         "Content-Disposition": `attachment; filename="${filename}"`,
//       },
//     });
//   } catch (err) {
//     console.error("PDF generation failed:", err);
//     return NextResponse.json(
//       { error: "Failed to generate PDF", details: (err as Error).message },
//       { status: 500 }
//     );
//   }
// }





// // src/app/api/agreement/route.ts
// import { NextResponse } from "next/server";
// import PDFDocument from "pdfkit";
// import fs from "fs";
// import path from "path";
// import { Buffer } from "buffer";

// export const runtime = "nodejs";

// export async function POST(req: Request) {
//   try {
//     const { clientName, clientAddress, startDate, endDate, fee, targetSales } = await req.json();

//     // -------------------- FONT PATHS --------------------
//     const fontsPath = path.join(process.cwd(), "public", "fonts");
//     const merriweatherPath = path.join(fontsPath, "Merriweather-VariableFont_opsz,wdth,wght.ttf");
//     const merriweatherBoldPath = path.join(fontsPath, "Merriweather-Bold.ttf"); // optional bold

//     if (!fs.existsSync(merriweatherPath)) {
//       throw new Error("Merriweather font missing in /public/fonts");
//     }
//     if (!fs.existsSync(merriweatherBoldPath)) {
//       console.warn("Merriweather Bold font missing; headings will use default weight");
//     }

//     // -------------------- PDF SETUP --------------------
//     const buffers: Buffer[] = [];
//     const doc = new PDFDocument({ margin: 50, size: "A4" });
//     doc.on("data", (chunk) => buffers.push(chunk));
//     doc.on("end", () => console.log("PDF generated ✅"));

//     // -------------------- REGISTER FONTS --------------------
//     doc.registerFont("Merriweather", merriweatherPath);
//     if (fs.existsSync(merriweatherBoldPath)) {
//       doc.registerFont("Merriweather-Bold", merriweatherBoldPath);
//     }
//     doc.font("Merriweather"); // default font

//     // -------------------- BACKGROUND COLOR --------------------
//     doc.rect(0, 0, doc.page.width, doc.page.height).fill("#f5f5f5"); // light gray
//     doc.fillColor("black"); // reset text color

//     // -------------------- HEADER --------------------
//     doc.font("Merriweather-Bold").fontSize(22).text(clientName, { align: "center" });
//     doc.moveDown(1);
//     doc.font("Merriweather").fontSize(12).text(`[${clientName}]`, { align: "center" });
//     doc.moveDown(2);

//     // -------------------- AGREEMENT INTRO --------------------
//     doc.font("Merriweather").fontSize(12).text(
//       `This Agreement is made and entered into on this ${startDate} To ${endDate} Between
// Magic Scale Restaurant Consultant, a [Proprietorship] having its registered office at [Near Air Force Camp, Rajokari, 110038],
// hereinafter referred to as "Consultant," represented by [Akash Verma as Sales Manager],

// AND

// ${clientName}, a [Proprietorship] having its registered office at ${clientAddress}.`
//     );
//     doc.moveDown();

//     doc.text(
//       `WHEREAS: The Client operates a restaurant known as ${clientName}. The Client desires to improve its business performance and has engaged the Consultant to provide consulting services. The Consultant has agreed to provide such services on the terms and conditions set forth herein.`
//     );
//     doc.moveDown();
//     doc.text(
//       "NOW, Therefore, in consideration of the mutual covenants and promises contained herein, the parties agree as follows:"
//     );

//     // -------------------- SECTIONS --------------------
//     doc.moveDown(2);

//     doc.font("Merriweather-Bold").text("1. Growth Target:");
//     doc.font("Merriweather").text(
//       `The Consultant will assist the Client in achieving a sales target of ${targetSales} in Swiggy and Zomato Marketplace, compared to the previous month's sales figures. This target will be assessed based on the Client's reported sales data. The Consultant will provide recommendations and support to achieve this target. If food quality is not maintained, and customer complaints are high, then the Consultant is not responsible for the target.`
//     );
//     doc.text("ADS budget will be INR 1500 per week.");
//     doc.moveDown();

//     doc.font("Merriweather-Bold").text("2. One Month Account Handling Charges:");
//     doc.font("Merriweather").text(
//       `The Client agrees to pay the Consultant a one-month account handling fee of INR ${fee} (Seven Thousand Only).`
//     );
//     doc.moveDown();

//     doc.font("Merriweather-Bold").text("3. Term and Termination:");
//     doc.font("Merriweather").text(
//       `This Agreement shall be valid for a period commencing on ${startDate} and ending on ${endDate}. This agreement may be terminated by either party with 15 days written notice.`
//     );
//     doc.moveDown();

//     doc.font("Merriweather-Bold").text("4. Scope of Services:");
//     doc.font("Merriweather").text("The Consultant's services may include, but are not limited to:");
//     doc.list([
//       "Menu analysis and recommendations",
//       "Marketing and promotional strategies",
//       "Operational efficiency improvements",
//       "Cost control measures",
//     ]);
//     doc.text(
//       "The specific scope of services will be mutually agreed upon and may be adjusted from time to time based on the Client's needs and progress towards the growth target."
//     );
//     doc.moveDown();

//     doc.font("Merriweather-Bold").text("5. Confidentiality:");
//     doc.font("Merriweather").text(
//       "Both parties agree to keep confidential any and all information shared during the course of this engagement."
//     );
//     doc.moveDown();

//     doc.font("Merriweather-Bold").text("6. Entire Agreement:");
//     doc.font("Merriweather").text(
//       "This Agreement constitutes the entire understanding between the parties and supersedes all prior negotiations and agreements, whether written or oral."
//     );

//     // -------------------- SIGNATURES --------------------
//     doc.moveDown(3);
//     doc.font("Merriweather-Bold").text("Magic Scale Restaurant Consultant");
//     doc.font("Merriweather").text("By: Akash Verma, Manager");
//     doc.moveDown(2);
//     doc.font("Merriweather-Bold").text(clientName);
//     doc.font("Merriweather").text("By: Authorized Signatory");

//     // -------------------- FOOTER --------------------
//     doc.moveDown(3);
//     doc.fontSize(10).font("Merriweather-Bold").text("Magic Scale", { align: "center" });
//     doc.font("Merriweather").text("Near Air Force Camp, Rajokari, 110038", { align: "center" });
//     doc.text("+91 9311330885", { align: "center" });
//     doc.text("https://magicscale.in", { align: "center" });

//     // -------------------- END PDF --------------------
//     doc.end();
//     await new Promise<void>((resolve) => doc.on("end", () => resolve()));

//     const pdfBytes = Buffer.concat(buffers);
//     const filename = `${clientName}-agreement.pdf`;

//     return new NextResponse(pdfBytes, {
//       headers: {
//         "Content-Type": "application/pdf",
//         "Content-Disposition": `attachment; filename="${filename}"`,
//       },
//     });
//   } catch (err) {
//     console.error("PDF generation failed:", err);
//     return NextResponse.json(
//       { error: "Failed to generate PDF", details: (err as Error).message },
//       { status: 500 }
//     );
//   }
// }




// // src/app/api/agreement/route.ts
// import { NextResponse } from "next/server";
// import PDFDocument from "pdfkit";
// import fs from "fs";
// import path from "path";

// export const runtime = "nodejs";

// export async function POST(req: Request) {
//   try {
//     const { clientName, clientAddress, startDate, endDate, fee, targetSales } =
//       await req.json();

//     // -------------------- FONT PATHS --------------------
//     const fontsPath = path.join(process.cwd(), "public", "fonts");
//     const regularFont = path.join(fontsPath, "Merriweather-Regular.ttf");
//     const boldFont = path.join(fontsPath, "Merriweather-Bold.ttf");

//     if (!fs.existsSync(regularFont) || !fs.existsSync(boldFont)) {
//       throw new Error("Merriweather fonts missing in /public/fonts");
//     }

//     // -------------------- PDF SETUP --------------------
//     const buffers: Buffer[] = [];
//     const doc = new PDFDocument({ margin: 50, size: "A4" }); // no font here
//     doc.on("data", (chunk: Buffer) => buffers.push(chunk));
//     doc.on("end", () => console.log("PDF generated ✅"));

//     // -------------------- REGISTER FONTS --------------------
//     doc.registerFont("Regular", regularFont);
//     doc.registerFont("Bold", boldFont);
//     doc.font("Regular"); // default font

//     // -------------------- BACKGROUND --------------------
//     doc.rect(0, 0, doc.page.width, doc.page.height).fill("#f5f5f5");
//     doc.fillColor("black");

//     // -------------------- HEADER --------------------
//     doc.font("Bold").fontSize(22).text(clientName, { align: "center" });
//     doc.moveDown(1);
//     doc.font("Regular").fontSize(12).text(`[${clientName}]`, { align: "center" });
//     doc.moveDown(2);

//     // -------------------- AGREEMENT BODY --------------------
//     doc.font("Regular").text(
//       `This Agreement is made and entered into on this ${startDate} To ${endDate} Between
// Magic Scale Restaurant Consultant, a [Proprietorship] having its registered office at [Near Air Force Camp, Rajokari, 110038],
// hereinafter referred to as "Consultant," represented by [Akash Verma as Sales Manager],

// AND

// ${clientName}, a [Proprietorship] having its registered office at ${clientAddress}.`
//     );
//     doc.moveDown();
//     doc.text(
//       `WHEREAS: The Client operates a restaurant known as ${clientName}. The Client desires to improve its business performance and has engaged the Consultant to provide consulting services. The Consultant has agreed to provide such services on the terms and conditions set forth herein.`
//     );
//     doc.moveDown();
//     doc.text(
//       "NOW, Therefore, in consideration of the mutual covenants and promises contained herein, the parties agree as follows:"
//     );
//     doc.moveDown(2);

//     // -------------------- SECTIONS --------------------
//     doc.font("Bold").text("1. Growth Target:");
//     doc.font("Regular").text(
//       `The Consultant will assist the Client in achieving a sales target of ${targetSales} in Swiggy and Zomato Marketplace, compared to the previous month's sales figures. This target will be assessed based on the Client's reported sales data. The Consultant will provide recommendations and support to achieve this target. If food quality is not maintained, and customer complaints are high, then the Consultant is not responsible for the target.`
//     );
//     doc.text("ADS budget will be INR 1500 per week.");
//     doc.moveDown();

//     doc.font("Bold").text("2. One Month Account Handling Charges:");
//     doc.font("Regular").text(
//       `The Client agrees to pay the Consultant a one-month account handling fee of INR ${fee} (Seven Thousand Only).`
//     );
//     doc.moveDown();

//     doc.font("Bold").text("3. Term and Termination:");
//     doc.font("Regular").text(
//       `This Agreement shall be valid for a period commencing on ${startDate} and ending on ${endDate}. This agreement may be terminated by either party with 15 days written notice.`
//     );
//     doc.moveDown();

//     doc.font("Bold").text("4. Scope of Services:");
//     doc.font("Regular").text("The Consultant's services may include, but are not limited to:");
//     doc.list([
//       "Menu analysis and recommendations",
//       "Marketing and promotional strategies",
//       "Operational efficiency improvements",
//       "Cost control measures",
//     ]);
//     doc.text(
//       "The specific scope of services will be mutually agreed upon and may be adjusted from time to time based on the Client's needs and progress towards the growth target."
//     );
//     doc.moveDown();

//     doc.font("Bold").text("5. Confidentiality:");
//     doc.font("Regular").text(
//       "Both parties agree to keep confidential any and all information shared during the course of this engagement."
//     );
//     doc.moveDown();

//     doc.font("Bold").text("6. Entire Agreement:");
//     doc.font("Regular").text(
//       "This Agreement constitutes the entire understanding between the parties and supersedes all prior negotiations and agreements, whether written or oral."
//     );

//     // -------------------- SIGNATURES --------------------
//     doc.moveDown(3);
//     doc.font("Bold").text("Magic Scale Restaurant Consultant");
//     doc.font("Regular").text("By: Akash Verma, Manager");
//     doc.moveDown(2);
//     doc.font("Bold").text(clientName);
//     doc.font("Regular").text("By: Authorized Signatory");

//     // -------------------- FOOTER --------------------
//     doc.moveDown(3);
//     doc.font("Bold").fontSize(10).text("Magic Scale", { align: "center" });
//     doc.font("Regular").text("Near Air Force Camp, Rajokari, 110038", { align: "center" });
//     doc.text("+91 9311330885", { align: "center" });
//     doc.text("https://magicscale.in", { align: "center" });

//     doc.end();
//     await new Promise<void>((resolve) => doc.on("end", () => resolve()));

//     const pdfBytes = Buffer.concat(buffers);
//     const filename = `${clientName}-agreement.pdf`;

//     return new NextResponse(pdfBytes, {
//       headers: {
//         "Content-Type": "application/pdf",
//         "Content-Disposition": `attachment; filename="${filename}"`,
//       },
//     });
//   } catch (err) {
//     console.error("PDF generation failed:", err);
//     return NextResponse.json(
//       { error: "Failed to generate PDF", details: (err as Error).message },
//       { status: 500 }
//     );
//   }
// }








// // src/app/api/agreement/route.ts
// import { NextResponse } from "next/server";
// import fs from "fs";
// import path from "path";

// export const runtime = "nodejs";

// export async function POST(req: Request) {
//   try {
//     const { clientName, clientAddress, startDate, endDate, fee, targetSales } = await req.json();

//     // -------------------- FONT PATHS --------------------
//     const fontsPath = path.join(process.cwd(), "public", "fonts");
//     const regularFont = path.join(fontsPath, "Merriweather-Regular.ttf");
//     const boldFont = path.join(fontsPath, "Merriweather-Bold.ttf");

//     if (!fs.existsSync(regularFont) || !fs.existsSync(boldFont)) {
//       throw new Error("Merriweather fonts missing in /public/fonts");
//     }

//     // -------------------- DYNAMIC IMPORT OF COMMONJS PDFKIT --------------------
//     const PDFKitModule = await import("pdfkit"); 
//     const PDFDocument = PDFKitModule.default || PDFKitModule; // ✅ get constructor

//     // -------------------- PDF SETUP --------------------
//     const doc = new PDFDocument({ margin: 50, size: "A4" }); // do not set font here
//     const buffers: Buffer[] = [];
//     doc.on("data", (chunk: Buffer) => buffers.push(chunk));
//     doc.on("end", () => console.log("PDF generated ✅"));

//     // -------------------- REGISTER FONTS --------------------
//     doc.registerFont("Regular", regularFont);
//     doc.registerFont("Bold", boldFont);
//     doc.font("Regular"); // default font

//     // -------------------- BACKGROUND --------------------
//     doc.rect(0, 0, doc.page.width, doc.page.height).fill("#f5f5f5");
//     doc.fillColor("black");

//     // -------------------- HEADER --------------------
//     doc.font("Bold").fontSize(22).text(clientName, { align: "center" });
//     doc.moveDown(1);
//     doc.font("Regular").fontSize(12).text(`[${clientName}]`, { align: "center" });
//     doc.moveDown(2);

//     // -------------------- BODY --------------------
//     doc.text(
//       `This Agreement is made and entered into on this ${startDate} To ${endDate} Between
// Magic Scale Restaurant Consultant, a [Proprietorship] having its registered office at [Near Air Force Camp, Rajokari, 110038],
// hereinafter referred to as "Consultant," represented by [Akash Verma as Sales Manager],

// AND

// ${clientName}, a [Proprietorship] having its registered office at ${clientAddress}.`
//     );
//     doc.moveDown();
//     doc.text(
//       `WHEREAS: The Client operates a restaurant known as ${clientName}. The Client desires to improve its business performance and has engaged the Consultant to provide consulting services. The Consultant has agreed to provide such services on the terms and conditions set forth herein.`
//     );
//     doc.moveDown();
//     doc.text("NOW, Therefore, in consideration of the mutual covenants and promises contained herein, the parties agree as follows:");
//     doc.moveDown(2);

//     // -------------------- SECTIONS --------------------
//     doc.font("Bold").text("1. Growth Target:");
//     doc.font("Regular").text(
//       `The Consultant will assist the Client in achieving a sales target of ${targetSales} in Swiggy and Zomato Marketplace, compared to the previous month's sales figures. This target will be assessed based on the Client's reported sales data. The Consultant will provide recommendations and support to achieve this target. If food quality is not maintained, and customer complaints are high, then the Consultant is not responsible for the target.`
//     );
//     doc.text("ADS budget will be INR 1500 per week.");
//     doc.moveDown();

//     doc.font("Bold").text("2. One Month Account Handling Charges:");
//     doc.font("Regular").text(`The Client agrees to pay the Consultant a one-month account handling fee of INR ${fee} (Seven Thousand Only).`);
//     doc.moveDown();

//     doc.font("Bold").text("3. Term and Termination:");
//     doc.font("Regular").text(`This Agreement shall be valid for a period commencing on ${startDate} and ending on ${endDate}. This agreement may be terminated by either party with 15 days written notice.`);
//     doc.moveDown();

//     doc.font("Bold").text("4. Scope of Services:");
//     doc.font("Regular").text("The Consultant's services may include, but are not limited to:");
//     doc.list([
//       "Menu analysis and recommendations",
//       "Marketing and promotional strategies",
//       "Operational efficiency improvements",
//       "Cost control measures",
//     ]);
//     doc.text(
//       "The specific scope of services will be mutually agreed upon and may be adjusted from time to time based on the Client's needs and progress towards the growth target."
//     );
//     doc.moveDown();

//     doc.font("Bold").text("5. Confidentiality:");
//     doc.font("Regular").text("Both parties agree to keep confidential any and all information shared during the course of this engagement.");
//     doc.moveDown();

//     doc.font("Bold").text("6. Entire Agreement:");
//     doc.font("Regular").text("This Agreement constitutes the entire understanding between the parties and supersedes all prior negotiations and agreements, whether written or oral.");

//     // -------------------- SIGNATURES --------------------
//     doc.moveDown(3);
//     doc.font("Bold").text("Magic Scale Restaurant Consultant");
//     doc.font("Regular").text("By: Akash Verma, Manager");
//     doc.moveDown(2);
//     doc.font("Bold").text(clientName);
//     doc.font("Regular").text("By: Authorized Signatory");

//     // -------------------- FOOTER --------------------
//     doc.moveDown(3);
//     doc.font("Bold").fontSize(10).text("Magic Scale", { align: "center" });
//     doc.font("Regular").text("Near Air Force Camp, Rajokari, 110038", { align: "center" });
//     doc.text("+91 9311330885", { align: "center" });
//     doc.text("https://magicscale.in", { align: "center" });

//     doc.end();
//     await new Promise<void>((resolve) => doc.on("end", () => resolve()));

//     const pdfBytes = Buffer.concat(buffers);
//     const filename = `${clientName}-agreement.pdf`;

//     return new NextResponse(pdfBytes, {
//       headers: {
//         "Content-Type": "application/pdf",
//         "Content-Disposition": `attachment; filename="${filename}"`,
//       },
//     });
//   } catch (err) {
//     console.error("PDF generation failed:", err);
//     return NextResponse.json(
//       { error: "Failed to generate PDF", details: (err as Error).message },
//       { status: 500 }
//     );
//   }
// }






// src/app/api/agreement/route.ts
import { NextResponse } from "next/server";
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { Buffer } from "buffer";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { clientName, clientAddress, startDate, endDate, fee, targetSales } =
      await req.json();

    // -------------------- FONT PATHS --------------------
    const fontsPath = path.join(process.cwd(), "public", "fonts");
    const arialPath = path.join(fontsPath, "Arial.ttf");
    const arialBoldPath = path.join(fontsPath, "Arial-Bold.ttf");

    if (!fs.existsSync(arialPath) || !fs.existsSync(arialBoldPath)) {
      throw new Error("Arial fonts missing in /public/fonts");
    }

    // -------------------- PDF SETUP --------------------
    const buffers: Buffer[] = [];

    // Pass a real TTF font at creation to avoid Helvetica.afm
    const doc = new PDFDocument({
      margin: 50,
      size: "A4",
      font: arialPath,
    });

    doc.on("data", (chunk) => buffers.push(chunk));
    const finished = new Promise<void>((resolve) => doc.on("end", () => resolve()));

    // -------------------- REGISTER FONTS --------------------
    doc.registerFont("Arial", arialPath);
    doc.registerFont("Arial-Bold", arialBoldPath);
    doc.font("Arial");

    // -------------------- HEADER --------------------
    doc.font("Arial-Bold").fontSize(22).text("SERVICE AGREEMENT", {
      align: "center",
    });
    doc.moveDown(2);

    doc.font("Arial").fontSize(12).text(
      `This Agreement is made and entered into on this ${startDate} To ${endDate} Between
Magic Scale Restaurant Consultant, a [Proprietorship] having its registered office at [Near Air Force Camp, Rajokari, 110038],
hereinafter referred to as "Consultant," represented by [Akash Verma as Sales Manager],

AND

${clientName}, a [Proprietorship] having its registered office at ${clientAddress}.`
    );

    doc.moveDown();
    doc.text(
      `WHEREAS: The Client operates a restaurant known as ${clientName}. The Client desires to improve its business performance and has engaged the Consultant to provide consulting services. The Consultant has agreed to provide such services on the terms and conditions set forth herein.`
    );

    doc.moveDown();
    doc.text(
      "NOW, Therefore, in consideration of the mutual covenants and promises contained herein, the parties agree as follows:"
    );

    doc.moveDown(2);

    // -------------------- AGREEMENT SECTIONS --------------------
    doc.font("Arial-Bold").text("1. Growth Target:");
    doc.font("Arial").text(
      `The Consultant will assist the Client in achieving a sales target of ${targetSales} in Swiggy and Zomato Marketplace, compared to the previous month's sales figures. This target will be assessed based on the Client's reported sales data. The Consultant will provide recommendations and support to achieve this target. If food quality is not maintained, and customer complaints are high, then the Consultant is not responsible for the target.`
    );
    doc.text("ADS budget will be INR 1500 per week.");
    doc.moveDown();

    doc.font("Arial-Bold").text("2. One Month Account Handling Charges:");
    doc.font("Arial").text(
      `The Client agrees to pay the Consultant a one-month account handling fee of INR ${fee} (Seven Thousand Only).`
    );
    doc.moveDown();

    doc.font("Arial-Bold").text("3. Term and Termination:");
    doc.font("Arial").text(
      `This Agreement shall be valid for a period commencing on ${startDate} and ending on ${endDate}. This agreement may be terminated by either party with 15 days written notice.`
    );
    doc.moveDown();

    doc.font("Arial-Bold").text("4. Scope of Services:");
    doc.font("Arial").text("The Consultant's services may include, but are not limited to:");
    doc.list([
      "Menu analysis and recommendations",
      "Marketing and promotional strategies",
      "Operational efficiency improvements",
      "Cost control measures",
    ]);
    doc.text(
      "The specific scope of services will be mutually agreed upon and may be adjusted from time to time based on the Client's needs and progress towards the growth target."
    );
    doc.moveDown();

    doc.font("Arial-Bold").text("5. Confidentiality:");
    doc.font("Arial").text(
      "Both parties agree to keep confidential any and all information shared during the course of this engagement."
    );
    doc.moveDown();

    doc.font("Arial-Bold").text("6. Entire Agreement:");
    doc.font("Arial").text(
      "This Agreement constitutes the entire understanding between the parties and supersedes all prior negotiations and agreements, whether written or oral."
    );

    // -------------------- SIGNATURES --------------------
    doc.moveDown(3);
    doc.font("Arial-Bold").text("Magic Scale Restaurant Consultant");
    doc.font("Arial").text("By: Akash Verma, Manager");
    doc.moveDown(2);
    doc.font("Arial-Bold").text(clientName);
    doc.font("Arial").text("By: Authorized Signatory");

    // -------------------- FOOTER --------------------
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    doc.moveDown(3);
    doc.font("Arial-Bold").fontSize(10).text("Magic Scale", { align: "center" });
    doc.font("Arial").text("Near Air Force Camp, Rajokari, 110038", {
      align: "center",
    });
    doc.text("+91 9311330885", { align: "center" });
    doc.text("https://magicscale.in", { align: "center" });
    doc.moveDown(1);
    doc.font("Arial").text(`Agreement generated on: ${formattedDate}`, {
      align: "right",
    });

    // -------------------- END PDF --------------------
    doc.end();
    await finished;

    const pdfBytes = Buffer.concat(buffers);
    const filename = `${clientName}-agreement.pdf`;

    return new NextResponse(pdfBytes, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (err) {
    console.error("Failed to create PDF document:", err);
    return NextResponse.json(
      { error: "Failed to generate PDF", details: (err as Error).message },
      { status: 500 }
    );
  }
}
