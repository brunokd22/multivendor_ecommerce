import { User } from "@/generated/prisma";
import { db } from "@/lib/db";
import { clerkClient } from "@clerk/express";
import { verifyWebhook } from "@clerk/nextjs/webhooks";

import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    // Do something with payload
    // For this guide, log payload to console
    const { id } = evt.data;

    if (evt.type === "user.created" || evt.type === "user.updated") {
      const data = evt.data;
      const user: Partial<User> = {
        id: data.id,
        email: data.email_addresses?.[0]?.email_address,
        name: `${data.first_name} ${data.last_name}`,
        profilePicture: data.image_url,
        // Add any other fields you need
      };
      if (!user) return;

      const dbUser = await db.user.upsert({
        where: { email: user.email! },
        update: user,
        create: {
          id: user.id!,
          email: user.email!,
          name: user.name!,
          profilePicture: user.profilePicture!,
          role: user.role! || "USER",
        },
      });

      // await clerkClient.users.updateUserMetadata(evt.data.id, {
      //   privateMetadata: {
      //     role: dbUser.role || "USER",
      //   },
      // });

      try {
        await clerkClient.users.updateUserMetadata(evt.data.id, {
          privateMetadata: {
            role: dbUser.role || "USER",
          },
        });
      } catch (error) {
        console.error("Error updating metadata:", error);
      }
    }

    if (evt.type === "user.deleted") {
      await db.user.delete({
        where: { id: evt.data.id },
      });
    }
    console.log(`Received webhook with ID ${id} and event type of ${evt.type}`);

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
