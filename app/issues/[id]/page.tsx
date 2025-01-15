import IssuesStatusBadge from "@/app/components/IssuesStatusBadge";
import { createIssueSchema } from "@/app/validationSchemas";
import { prisma } from "@/prisma/client";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import delay from "delay";
import { notFound } from "next/navigation";
import React from "react";
import ReactMarkdown from "react-markdown";
import { z } from "zod";
import {Pencil2Icon} from '@radix-ui/react-icons'
import Link from "next/link";

const IssuesDetailPage = async ({ params }: { params: { id: string } }) => {
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) },
    });

    if (!issue) notFound();

    await delay(3000);

    return (
        <>
            <Grid columns={{initial:"1", md:'2'}} gap={"5"}>
                <Box>
                    <Heading>{issue.title}</Heading>
                    <Flex gap={"3"} my={"2"}>
                        <IssuesStatusBadge status={issue.status} />
                        <Text>{issue.createdAt.toDateString()}</Text>
                    </Flex>
                    <Card className="prose">
                        <ReactMarkdown className="text-white">
                            {issue.description}
                        </ReactMarkdown>
                    </Card>
                </Box>
                <Box>
                    <Button>
                        <Pencil2Icon/>
                        <Link href={`/issues/${issue.id}/edit`}>
                            Edit Issue
                        </Link>
                    </Button>
                </Box>
            </Grid>
        </>
    );
};

export default IssuesDetailPage;
