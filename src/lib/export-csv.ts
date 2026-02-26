import { utils, writeFile } from "xlsx";

export const exportToCSV = (data: Record<string, unknown>[], filename: string) => {
  const ws = utils.json_to_sheet(data);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "Data");
  writeFile(wb, `${filename}.xlsx`);
};
