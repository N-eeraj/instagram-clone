import * as z from "zod"

export const fileSchema = z.instanceof(File)
  .refine(file => file.size > 0, {
    message: 'File cannot be empty.',
  })
  .refine(file => file.size < 52_428_800, {
    message: "File too large.",
  })

export const fileObjectSchema = z.object({
  file: fileSchema,
  type: z.enum(["photo", "video"]),
})

export const newPostSchema = z.object({
  files: z.array(fileObjectSchema)
    .min(1, {
      message: "Please select at least 1 image or video."
    }).max(10, {
      message: "Upto 10 files can be uploaded in a single post."
    }),
  caption: z.string().optional()
})
