// import { NextApiRequest, NextApiResponse } from "next";
// import prisma from "@/database";
// // Ensure you have your prisma client imported

// export default async function handle(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === "PUT") {
//     const { id, reaction } = req.body;

//     try {
//       // Find if the user has already reacted to this post
//       const existingReaction = await prisma.reaction.findFirst({
//         where: {
//           postId: id,
//           user: reaction.user,
//         },
//       });

//       if (existingReaction) {
//         // Update the existing reaction
//         await prisma.reaction.update({
//           where: {
//             id: existingReaction.id,
//           },
//           data: {
//             type: reaction.type,
//           },
//         });
//       } else {
//         // Create a new reaction
//         await prisma.reaction.create({
//           data: {
//             type: reaction.type,
//             user: reaction.user,
//             postId: id,
//           },
//         });
//       }

//       res.status(200).json({ success: true });
//     } catch (error) {
//       console.error("Error saving reaction: ", error);
//       res.status(500).json({ success: false, error: "Internal server error" });
//     }
//   } else {
//     res.status(405).json({ message: "Method not allowed" });
//   }
// }
