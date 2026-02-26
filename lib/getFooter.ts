import { cache } from "react";
import dbConnect from "@/lib/mongodb";
import FooterModel from "@/app/models/Footer";

export const getFooter = cache(async () => {
  await dbConnect();
  const footer = await FooterModel.findOne().lean();
  return JSON.parse(JSON.stringify(footer));
});
