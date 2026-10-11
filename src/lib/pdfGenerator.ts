import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CartItem, QuoteCustomer } from '../types';

interface PDFQuoteData {
  quoteId: string;
  date: string;
  customer: QuoteCustomer;
  items: CartItem[];
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  taxAmount: number;
  grandTotal: number;
  notes?: string;
}

export const generateQuotePDF = (data: PDFQuoteData) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Background clean header accent line
  doc.setFillColor(14, 159, 142); // Primary teal
  doc.rect(0, 0, pageWidth, 8, 'F');

  // Brand Name & Subhead
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(11, 31, 42); // Dark ink
  doc.text('LUMORA LABS', 40, 48);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(91, 107, 115);
  doc.text('WHOLESALE BIOTECH & PEPTIDE SYNTHESIS', 40, 62);
  doc.text('Hong Kong SAR • Los Angeles, USA • sales@lumoralabs.com', 40, 74);

  // Quote Meta Block (Right aligned)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(14, 159, 142);
  doc.text('WHOLESALE QUOTATION', pageWidth - 40, 46, { align: 'right' });

  doc.setFont('courier', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(11, 31, 42);
  doc.text(`ID: ${data.quoteId}`, pageWidth - 40, 62, { align: 'right' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(91, 107, 115);
  doc.text(`Date: ${data.date}`, pageWidth - 40, 75, { align: 'right' });
  doc.text('Validity: 30 Days from Issue', pageWidth - 40, 87, { align: 'right' });

  // Divider line
  doc.setDrawColor(228, 234, 232);
  doc.setLineWidth(1);
  doc.line(40, 98, pageWidth - 40, 98);

  // Customer / Destination Info Box
  doc.setFillColor(246, 248, 247);
  doc.roundedRect(40, 110, pageWidth - 80, 78, 6, 6, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(11, 31, 42);
  doc.text('PREPARED FOR / INSTITUTION:', 54, 128);
  doc.text('DESTINATION / DISPATCH:', (pageWidth / 2) + 10, 128);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(91, 107, 115);

  const clientCompany = data.customer.companyName || 'Institutional Client';
  const clientContact = data.customer.contactName || 'Procurement Officer';
  const clientEmail = data.customer.email || 'N/A';
  const clientPhone = data.customer.phoneWhatsapp || 'N/A';

  doc.text(`${clientCompany}`, 54, 143);
  doc.text(`Attn: ${clientContact}`, 54, 156);
  doc.text(`Email: ${clientEmail} | Phone: ${clientPhone}`, 54, 169);

  const shippingCountry = data.customer.shippingCountry || 'International Express Freight';
  const shippingAddr = data.customer.shippingAddress || 'Standard temperature-controlled delivery';
  doc.text(`Country: ${shippingCountry}`, (pageWidth / 2) + 10, 143);
  doc.text(`Address: ${shippingAddr.substring(0, 45)}`, (pageWidth / 2) + 10, 156);
  doc.text('Cold-chain insulated packaging with ice packs included', (pageWidth / 2) + 10, 169);

  // Line items table
  const tableData = data.items.map((item, index) => [
    (index + 1).toString(),
    item.product.sku,
    `${item.product.name}\n${item.product.spec}`,
    item.product.purity || '≥99.0%',
    item.quantity.toString(),
    `$${item.product.price.toFixed(2)}`,
    `$${(item.quantity * item.product.price).toFixed(2)}`
  ]);

  autoTable(doc, {
    startY: 202,
    head: [['#', 'SKU', 'DESCRIPTION & SPECIFICATION', 'PURITY', 'QTY', 'UNIT PRICE', 'AMOUNT (USD)']],
    body: tableData,
    theme: 'grid',
    headStyles: {
      fillColor: [11, 31, 42],
      textColor: [255, 255, 255],
      fontSize: 8,
      fontStyle: 'bold',
      halign: 'left',
      cellPadding: 7
    },
    columnStyles: {
      0: { cellWidth: 24, halign: 'center' },
      1: { cellWidth: 54, font: 'courier', fontStyle: 'bold' },
      2: { cellWidth: 'auto' },
      3: { cellWidth: 58, font: 'courier' },
      4: { cellWidth: 36, halign: 'center', fontStyle: 'bold' },
      5: { cellWidth: 65, halign: 'right', font: 'courier' },
      6: { cellWidth: 75, halign: 'right', font: 'courier', fontStyle: 'bold' }
    },
    styles: {
      fontSize: 8.5,
      textColor: [11, 31, 42],
      lineColor: [228, 234, 232],
      lineWidth: 0.5,
      cellPadding: 6
    },
    alternateRowStyles: {
      fillColor: [250, 252, 251]
    },
    margin: { left: 40, right: 40 }
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const finalY = (doc as any).lastAutoTable.finalY + 14;

  // Notes and Totals block
  const totalsX = pageWidth - 220;
  const totalsW = 180;

  // Notes on left
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(11, 31, 42);
  doc.text('TERMS & WHOLESALE CONDITIONS:', 40, finalY + 10);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(91, 107, 115);
  const notesText = [
    '• Payment terms: Wire transfer (TT), Corporate ACH, or Major Credit Card.',
    '• Lead time: In-stock SKUs dispatch within 24-48 business hours.',
    '• Every batch ships with an authentic HPLC & LC-MS Certificate of Analysis (COA).',
    data.notes ? `• Specific request: "${data.notes}"` : '• Special handling: Vacuum-sealed desiccant vials.'
  ];
  let currNoteY = finalY + 22;
  notesText.forEach(line => {
    doc.text(line, 40, currNoteY);
    currNoteY += 11;
  });

  // Totals Box on Right
  doc.setFillColor(246, 248, 247);
  doc.roundedRect(totalsX, finalY, totalsW, 90, 6, 6, 'F');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(91, 107, 115);
  doc.text('Subtotal:', totalsX + 12, finalY + 18);
  doc.text(`$${data.subtotal.toFixed(2)}`, totalsX + totalsW - 12, finalY + 18, { align: 'right' });

  if (data.discountAmount > 0) {
    doc.setTextColor(14, 159, 142);
    doc.text('Wholesale Volume Discount:', totalsX + 12, finalY + 32);
    doc.text(`-$${data.discountAmount.toFixed(2)}`, totalsX + totalsW - 12, finalY + 32, { align: 'right' });
  }

  doc.setTextColor(91, 107, 115);
  doc.text('Cold-chain Shipping:', totalsX + 12, finalY + 46);
  doc.text(data.shippingFee === 0 ? 'FREE' : `$${data.shippingFee.toFixed(2)}`, totalsX + totalsW - 12, finalY + 46, { align: 'right' });

  if (data.taxAmount > 0) {
    doc.text('Estimated Tax / Handling:', totalsX + 12, finalY + 59);
    doc.text(`$${data.taxAmount.toFixed(2)}`, totalsX + totalsW - 12, finalY + 59, { align: 'right' });
  }

  // Grand Total line
  doc.setDrawColor(228, 234, 232);
  doc.line(totalsX + 12, finalY + 67, totalsX + totalsW - 12, finalY + 67);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(11, 31, 42);
  doc.text('Grand Total (USD):', totalsX + 12, finalY + 81);
  doc.setFont('courier', 'bold');
  doc.text(`$${data.grandTotal.toFixed(2)}`, totalsX + totalsW - 12, finalY + 81, { align: 'right' });

  // Legal Research Disclaimer Banner at bottom
  const bottomY = doc.internal.pageSize.getHeight() - 50;
  doc.setFillColor(254, 242, 242); // Soft warning red/pink
  doc.roundedRect(40, bottomY - 14, pageWidth - 80, 26, 4, 4, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(185, 28, 28); // Dark red
  doc.text(
    'LEGAL NOTICE: ALL PRODUCTS ARE SUPPLIED FOR IN VITRO LABORATORY RESEARCH PURPOSES ONLY. NOT FOR HUMAN OR VETERINARY USE.',
    pageWidth / 2,
    bottomY + 1,
    { align: 'center' }
  );

  // Footer copyright
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184);
  doc.text('Lumora Labs Biotech Group Ltd. • ISO 9001:2015 Certified • USP Grade Standards', pageWidth / 2, bottomY + 28, { align: 'center' });

  // Save the document
  doc.save(`${data.quoteId}_LumoraLabs_Quotation.pdf`);
};
