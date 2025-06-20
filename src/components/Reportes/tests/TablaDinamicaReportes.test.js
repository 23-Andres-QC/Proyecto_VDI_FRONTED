import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import TablaDinamicaReportes from '../TablaDinamicaReportes.vue'
import { exportarExcelPorTipo } from '../exportarUtils.js'

vi.mock('../exportarUtils.js', () => ({
  exportarExcelPorTipo: vi.fn(),
}))

describe('TablaDinamicaReportes.vue', () => {
  it('should convert Proxy data to plain arrays and call exportarExcelPorTipo', async () => {
    const wrapper = mount(TablaDinamicaReportes, {
      props: {},
    })

    // Mock data
    const mockFiltrados = [
      { idUsuario: 1, nombre: 'John Doe' },
      { idUsuario: 2, nombre: 'Jane Doe' },
    ]
    const mockColumnas = ['idUsuario', 'nombre']

    // Simulate updating table data
    await wrapper.vm.actualizarTabla(mockFiltrados, mockColumnas)

    // Simulate enviar-reporte event
    await wrapper.vm.manejarEnvio({ formato: 'Excel', correos: 'test@example.com' })

    // Assertions
    expect(exportarExcelPorTipo).toHaveBeenCalledWith(
      mockFiltrados,
      mockColumnas,
      'Usuarios',
      'Excel',
      'test@example.com',
      expect.any(String),
    )
  })
})
