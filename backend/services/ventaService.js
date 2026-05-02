const RECARGOS = {
  efectivo:     { porcentaje: 0,    label: 'Efectivo' },
  daviplata:    { porcentaje: 0,    label: 'Daviplata' },
  nequi:        { porcentaje: 0,    label: 'Nequi' },
  bold:         { porcentaje: 0,    label: 'Bold' },
  tarjeta:      { porcentaje: 0.05, label: 'Tarjeta' },
  sistecredito: { porcentaje: 0.05, label: 'Sistecrédito' },
  addi:         { porcentaje: 0.10, label: 'Addi' },
};

function calcularTotal(subtotal, metodoPago) {
  const cfg = RECARGOS[metodoPago];
  if (!cfg) throw new Error(`Método de pago inválido: ${metodoPago}`);
  const montoRecargo = Math.round(subtotal * cfg.porcentaje);
  return { porcentaje: cfg.porcentaje, montoRecargo, total: subtotal + montoRecargo, label: cfg.label };
}

function formatCOP(n) {
  return '$ ' + new Intl.NumberFormat('es-CO').format(Math.round(n));
}

module.exports = { RECARGOS, calcularTotal, formatCOP };
