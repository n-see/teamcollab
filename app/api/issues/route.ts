import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import {z} from 'zod'
import { issueSchema } from "@/app/validationSchemas";
import { authOptions } from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";

// const createIssueSchema = z.object({
//     title:z.string().min(1).max(255),
//     description: z.string().min(1)
// })

export async function POST(request:NextRequest) {

    const sessions = await getServerSession(authOptions);

    if(!sessions)
        return NextResponse.json({}, {status:401})

    const body = await request.json();

    const validation = issueSchema.safeParse(body);
    if(!validation.success)
        return NextResponse.json(validation.error.format(), {status:400})
    const newIssue = await prisma.issue.create({
        data: {title:body.title, description: body.description}

    });

    return NextResponse.json(newIssue,{status: 201})

}