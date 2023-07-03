import { write } from "./lib/@esliph/wt";

type NFArgs = { NOME_CLIENTE: string; VALOR: string };

function gerarNotaFiscal({ NOME_CLIENTE, VALOR }: NFArgs) {
  const args = {
    NOME_CLIENTE,
    VALOR,
  };

  const fileContent = write<NFArgs>(args, {
    template: "public/templates/template_nota-fiscal.html",
    dist: `public/templates/_nf/${new Date(
      Date.now()
    ).getTime()}_nota_fiscal.html`,
  });

  return fileContent;
}

const resultFile = gerarNotaFiscal({
  NOME_CLIENTE: "Dan Ruan",
  VALOR: "1.000,00",
});

console.log(resultFile.getResult());
