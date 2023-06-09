import { Result } from "@esliph/util";
import fs from "fs";

function writeTemplate(args, fileConfig) {
  try {
    let template = fs.readFileSync(fileConfig.pathTemplate, "utf-8");

    for (const key in args) {
      if (!key) {
        continue;
      }

      console.log(key, args[key]);

      template = template.replace(`{{${key}}}`, args[key]);
    }

    const name = `${new Date(Date.now()).getTime()}_${fileConfig.fileName}.${
      fileConfig.ext || "txt"
    }`;

    fs.writeFileSync(`${fileConfig.pathDist}/${name}`, template);

    return Result.success(template);
  } catch (err) {
    return Result.failure(
      {
        title: "Write Template",
        message: [
          {
            message: err.message || "Cannot write template",
            origin: err.path || fileConfig.pathTemplate,
          },
        ],
      },
      400
    );
  }
}

function gerarNotaFiscal(args) {
  const fileContent = writeTemplate(args, {
    pathTemplate: "templates/template_nota-fiscal.html",
    pathDist: "temp_dist",
    fileName: "nota_fiscal",
    ext: "html",
  });

  return fileContent;
}

const resultFile = gerarNotaFiscal({
  NOME_CLIENTE: "Dan Ruan",
  VALOR: "1.000,00",
});

resultFile.getResult().error &&
  console.log(resultFile.getResult().error.message);
