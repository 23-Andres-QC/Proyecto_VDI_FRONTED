// Utilidades para exportar datos a Excel y PDF desde el frontend
import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export function exportarExcel(datos, nombre = 'reporte') {
  // Imprimir los datos en consola en formato JSON para depuración
  console.log('ExportarExcel - datos:', JSON.stringify(datos, null, 2))

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
  // Imprimir los datos en consola en formato JSON para depuración
  console.log('ExportarPDF - datos:', JSON.stringify(datos, null, 2))

  const doc = new jsPDF()
  const headers = [columnas]
  const rows = datos.map((row) => columnas.map((col) => row[col]))
  autoTable(doc, { head: headers, body: rows })
  doc.save(`${nombre}.pdf`)
}

export async function exportarExcelPorTipo(
  datos,
  tipoTabla,
  formato,
  correo,
  nombre = 'reporte',
  formatoCorreo = 'consulta',
  datosCorreo = {},
) {
  // Imprimir los datos en consola en formato JSON para depuración
  console.log('ExportarExcelPorTipo - datos:', JSON.stringify(datos, null, 2))

  // Validar que los datos sean un array válido y no vacío
  if (!Array.isArray(datos) || datos.length === 0) {
    alert('Error: Los datos proporcionados para la exportación no son válidos.')
    return
  }

  // Validar que los datos no sean solo un mensaje de error
  if (
    datos.length === 1 &&
    typeof datos[0] === 'object' &&
    datos[0] !== null &&
    Object.keys(datos[0]).length === 1 &&
    datos[0].mensaje
  ) {
    alert('No hay datos disponibles para exportar.')
    return
  }

  // Definir el orden de columnas esperado según el tipo de tabla
  let columnasEsperadas = []
  switch (tipoTabla) {
    case 'Usuarios':
      columnasEsperadas = [
        'Nombre',
        'Correo',
        'Estado',
        'Fecha Creación',
        'Fecha Modificación', // Ajusta según tu plantilla y orden real
      ]
      break
    case 'Profesores Importados':
      columnasEsperadas = [
        'Nombre',
        'Correo',
        'Departamento',
        'Categoría',
        'Fecha', // Ajusta según tu plantilla
      ]
      break
    case 'ISSN':
      columnasEsperadas = [
        'ISSN',
        'Nombre',
        'SCOPUS',
        'WoS (Q)',
        'WoS (S)',
        'WoS ESCi',
        'ESCI Q',
        'AJG=4*',
        'AJG',
        'AJG (S)',
        'CNRS',
        'CNRS (S)',
        'ABDC',
        'ABDC (S)',
        'Al menos en una lista',
        'Solo en una lista',
        'Scielo',
        'WoS LATAM',
        'TOP50',
        'N',
        "BEALL'S LIST",
        'MDPI',
        'INSIGHTS',
        'AJG Existe',
        'CNRS Existe',
        'ABDC Existe',
        'WoS top Existe',
        'WoS ESCI Existe',
        'Scopus Existe',
        'Solo Scielo Existe',
        '2.1.6B especial',
        'Latam sin ESCI Existe',
        'ESCI/scielo sin Scupus',
        'Múltiple',
        'Multidisciplinary WOS',
        'Coautoria ESAN',
        'Posición del autor',
        'JIF',
        'Country',
        'Multy y al menos una lista',
        'Multidisciplinary SCOPUS',
        'Multidisciplinary WOS O SCOPYS',
      ]
      break
    case 'Lista Cerrada':
      columnasEsperadas = [
        'ISSN',
        'ISSN2',
        'ISSN3',
        'Nombre',
        'Categoría',
        'Puntaje',
        'Incentivo (USD)',
        'SCOPUS',
        'WoS (Q)',
        'ESCI Q',
        'AJG',
        'CNRS',
        'ABDC',
        'WoS LATAM',
      ]
      break
    default:
      alert('Error: Tipo de tabla no reconocido para la exportación.')
      return
  }

  // Si los datos ya son array de arrays, úsalos directamente; si son array de objetos, mapea al orden de columnas
  let datosPlanos
  if (Array.isArray(datos[0])) {
    datosPlanos = datos
  } else {
    datosPlanos = datos.map((obj) =>
      columnasEsperadas.map((col) => (obj[col] !== undefined ? obj[col] : '')),
    )
  }

  // (Opcional) Si quieres agregar encabezados, descomenta la siguiente línea:
  // datosPlanos = [columnasEsperadas, ...datosPlanos]

  // Determinar la plantilla de Excel según el tipo de tabla
  let plantilla
  switch (tipoTabla) {
    case 'Usuarios':
      plantilla = '/Reportes/Tablas/FormatoUsuarios.xlsx'
      break
    case 'Profesores Importados':
      plantilla = '/Reportes/Tablas/FormatoProfesores.xlsx'
      break
    case 'ISSN':
      plantilla = '/Reportes/Tablas/FormatoExcelRevista.xlsx'
      break
    case 'Lista Cerrada':
      plantilla = '/Reportes/Tablas/FormatoExcelLisaCerrada.xlsx'
      break
    default:
      alert('Error: Tipo de tabla no reconocido para la exportación.')
      return
  }

  // --- NUEVO: Plantillas de correo ---
  function getCorreoConsulta({ nombreRevista }) {
    return {
      subject: `Registro de consulta – ISSN / Lista Cerrada – ${nombreRevista}`,
      body: '', // Solo enviar el asunto, el cuerpo queda vacío
    }
  }

  function getCorreoReporte({ tipoReporte, periodo }) {
    return {
      subject: `Registro de envío – Reporte administrativo ${tipoReporte} – ${periodo || ''}`,
      body: '', // Solo enviar el asunto, el cuerpo queda vacío
    }
  }

  try {
    // Cargar la plantilla como ArrayBuffer
    const response = await fetch(plantilla)
    if (!response.ok) {
      throw new Error(`No se pudo cargar la plantilla: ${plantilla}`)
    }
    const arrayBuffer = await response.arrayBuffer()

    // Leer la plantilla
    const wb = XLSX.read(arrayBuffer, { type: 'array' })
    const ws = wb.Sheets[wb.SheetNames[0]]

    // Insertar los datos a partir de la fila 2 (A2)
    XLSX.utils.sheet_add_aoa(ws, datosPlanos, { origin: 'A2' })

    // Escribir el archivo Excel
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
    const blob = new Blob([wbout], { type: 'application/octet-stream' })

    // Descargar el archivo
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `/Reportes/ReportesGenerados/${nombre}_${tipoTabla}_${formato}.xlsx`
    document.body.appendChild(a)
    a.click()

    setTimeout(() => {
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    }, 100)

    // Enviar correo con el archivo adjunto usando la API backend
    if (correo) {
      const correosLimpios = correo
        .split(',')
        .map((c) => c.trim())
        .filter(Boolean)
        .join(';')
      let subject = 'Reporte'
      let body = 'Adjunto el reporte generado.'
      const nombreArchivo = `${nombre}_${tipoTabla}_${formato}.xlsx`
      // let fechaHoy = new Date().toLocaleDateString() // Eliminado: no se usa
      let datosExtra = {}
      if (formatoCorreo === 'consulta') {
        const { nombreRevista = '' } = datosCorreo
        datosExtra = {
          tipo: 'Consulta',
          nombreUsuario: 'usuario1', // Forzar usuario1
          revista: nombreRevista,
        }
        const plantilla = getCorreoConsulta({
          nombreRevista,
        })
        subject = plantilla.subject
        body = plantilla.body
      } else if (formatoCorreo === 'reporte') {
        const { tipoReporte = '', periodo = '', filtros = '' } = datosCorreo
        datosExtra = {
          tipo: tipoReporte,
          nombreUsuario: 'usuario1',
          filtros,
        }
        const plantilla = getCorreoReporte({
          tipoReporte,
          periodo,
        })
        subject = plantilla.subject
        body = plantilla.body
      }
      // Enviar al backend
      const formData = new FormData()
      formData.append(
        'archivo',
        new File([blob], nombreArchivo, {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        }),
      )
      formData.append('correo', correosLimpios)
      formData.append('asunto', subject)
      formData.append('cuerpo', body)
      formData.append('formatoCorreo', formatoCorreo)
      if (datosExtra.tipo) formData.append('tipo', datosExtra.tipo)
      formData.append('nombreUsuario', 'usuario1') // Forzar usuario1 siempre
      if (datosExtra.revista) formData.append('revista', datosExtra.revista)
      if (datosExtra.filtros) formData.append('filtros', datosExtra.filtros)

      // Validación y log antes de enviar
      const archivoEnviado = formData.get('archivo')
      const correoEnviado = formData.get('correo')
      console.log('Archivo:', archivoEnviado)
      console.log('Archivo size:', archivoEnviado ? archivoEnviado.size : 'no file')
      console.log('Correo:', correoEnviado)
      if (!archivoEnviado || archivoEnviado.size === 0) {
        alert('El archivo no se generó correctamente o está vacío.')
        return
      }
      if (!correoEnviado) {
        alert('El campo correo está vacío.')
        return
      }
      try {
        const response = await fetch('http://localhost:5009/api/enviar-reporte', {
          method: 'POST',
          body: formData,
        })
        const result = await response.json()
        if (result.success) {
          alert('Correo enviado correctamente.')
        } else {
          alert('Error al enviar correo: ' + (result.message || ''))
        }
      } catch (err) {
        alert('Error al enviar correo: ' + err.message)
      }
    }
  } catch (error) {
    console.error('Error al exportar el archivo:', error)
    alert(`Error al exportar el archivo: ${error.message}`)
  }
}
