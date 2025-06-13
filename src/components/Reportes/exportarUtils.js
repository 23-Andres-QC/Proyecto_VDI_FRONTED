// Utilidades para exportar datos a Excel y PDF desde el frontend
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export function exportarExcel(datos, columnas, nombre = 'reporte') {
  const ws = XLSX.utils.json_to_sheet(datos, { header: columnas });
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Reporte');
  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([wbout], { type: 'application/octet-stream' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${nombre}.xlsx`;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }, 100);
}

export function exportarPDF(datos, columnas, nombre = 'reporte') {
  const doc = new jsPDF();
  const headers = [columnas];
  const rows = datos.map(row => columnas.map(col => row[col]));
  autoTable(doc, { head: headers, body: rows });
  doc.save(`${nombre}.pdf`);
}
