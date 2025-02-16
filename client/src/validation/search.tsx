import { z } from "zod";

export type SearchItem = {
  query: string;
};

const searchValidationSchema = z.object({
  query: z
    .string()
    .min(1, { message: "キーワードは、1文字以上入れてください。" }),
});

export { searchValidationSchema };
export type SearchValidationType = z.infer<typeof searchValidationSchema>;
