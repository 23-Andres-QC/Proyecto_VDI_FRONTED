// Utilidades para exportar datos a Excel y PDF desde el frontend
import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export function exportarExcel(datos, nombre = 'reporte') {
  // Crear una hoja de cálculo con encabezados en la primera fila
  const ws = XLSX.utils.json_to_sheet(datos, { skipHeader: true })

  // Crear el libro de trabajo y agregar la hoja
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Reporte')

  // Escribir el archivo Excel
  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
  const blob = new Blob([wbout], { type: 'application/octet-stream' })

  // Descargar el archivo
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${nombre}.xlsx`
  document.body.appendChild(a)
  a.click()

  // Limpiar recursos
  setTimeout(() => {
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
  }, 100)
}

export function exportarPDF(datos, columnas, nombre = 'reporte') {
  const doc = new jsPDF()
  const headers = [columnas]
  const rows = datos.map((row) => columnas.map((col) => row[col]))
  autoTable(doc, { head: headers, body: rows })
  doc.save(`${nombre}.pdf`)
}

export async function exportarExcelPorTipo(datos, tipoTabla, formato, correo, nombre = 'reporte') {
  // Validar que los datos sean un array de objetos válido
  if (!Array.isArray(datos) || typeof datos[0] !== 'object') {
    console.error('Los datos proporcionados no son válidos. Deben ser un array de objetos.')
    alert('Error: Los datos proporcionados para la exportación no son válidos.')
    return
  }

  // Si los datos están vacíos, agregar una fila predeterminada
  if (datos.length === 0) {
    datos = [{ mensaje: 'No hay datos disponibles para exportar.' }]
  }

  // Convertir los datos a un formato plano
  const datosPlanos = JSON.parse(JSON.stringify(datos))

  // Determinar el formato de Excel según el tipo de tabla
  let formatoArchivo
  switch (tipoTabla) {
    case 'Usuarios':
      formatoArchivo = '/FormatoUsuarios.xlsx'
      break
    case 'Profesores Importados':
      formatoArchivo = '/FormatoProfesores.xlsx'
      break
    case 'ISSN':
      formatoArchivo = '/FormatoExcelRevista.xlsx'
      break
    case 'Lista Cerrada':
      formatoArchivo = '/FormatoExcelLisaCerrada.xlsx'
      break
    default:
      console.error('Tipo de tabla no reconocido')
      alert('Error: Tipo de tabla no reconocido para la exportación.')
      return
  }

  try {
    // Cargar el archivo de formato como ArrayBuffer
    const response = await fetch(formatoArchivo)
    if (!response.ok) {
      throw new Error(`No se pudo cargar el archivo de formato: ${formatoArchivo}`)
    }
    const arrayBuffer = await response.arrayBuffer()

    // Leer el archivo de formato desde el ArrayBuffer
    const wb = XLSX.read(arrayBuffer, { type: 'array' })
    const ws = wb.Sheets[wb.SheetNames[0]]

    // Validar que la hoja de cálculo existe y tiene el formato esperado
    if (!ws) {
      throw new Error('La hoja de cálculo no se pudo cargar correctamente.')
    }

    // Insertar los datos en la segunda fila (sin agregar encabezados)
    try {
      XLSX.utils.sheet_add_json(ws, datosPlanos, {
        skipHeader: true,
        origin: 'A2',
      })
    } catch (error) {
      console.error('Error al insertar los datos en la hoja de cálculo:', error)
      alert('Error al insertar los datos en la hoja de cálculo. Verifique la plantilla.')
      return
    }

    // Escribir el archivo Excel
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
    const blob = new Blob([wbout], { type: 'application/octet-stream' })

    // Descargar el archivo
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${nombre}_${tipoTabla}_${formato}.xlsx`
    document.body.appendChild(a)
    a.click()

    // Limpiar recursos
    setTimeout(() => {
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    }, 100)

    // Enviar correo con el archivo adjunto (simulado)
    if (correo) {
      const correosLimpios = correo
        .split(',')
        .map((c) => c.trim())
        .filter(Boolean)
        .join(';')
      setTimeout(() => {
        window.location.href = `mailto:${correosLimpios}?subject=Reporte&body=Adjunto el reporte generado (${formato}).`
      }, 500)
    }
  } catch (error) {
    console.error('Error al exportar el archivo:', error)
    alert(`Error al exportar el archivo: ${error.message}`)
  }
}
