const pc = require('picocolors');

console.log(pc.red('Este es un texto en rojo'));
console.log(pc.green('Este es un texto en verde'));
console.log(pc.blue('Este es un texto en azul'));
console.log(
  pc.green(`How are ${pc.italic('you')} doing?`)
);
