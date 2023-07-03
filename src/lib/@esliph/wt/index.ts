import { Result } from "@esliph/util";
import fs from "fs";

export type WriteArgs<T extends object> = { [x in keyof T]: any };
export type WriteFileConfig = {
  template: string;
  dist: string;
};

export function write<T extends WriteArgs<T>>(
  args: T,
  fileConfig: WriteFileConfig
) {
  try {
    let template = fs.readFileSync(fileConfig.template, "utf-8");

    for (const key in args) {
      if (!key) {
        continue;
      }

      template = template.replace(`{{${key}}}`, args[key]);
    }

    fs.writeFileSync(`${fileConfig.dist}`, template, {
      encoding: "utf-8",
    });

    return Result.success<string>(template);
  } catch (err: any) {
    return Result.failure<string>(
      {
        title: "Write Template",
        message: [
          {
            message: err.message || "Cannot write template",
            origin: err.path || fileConfig.template,
          },
        ],
      },
      400
    );
  }
}