import { prisma } from "@/prisma/client";
import { Box, Grid } from "@radix-ui/themes";
import delay from "delay";
import { notFound } from "next/navigation";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";

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
                    <IssueDetails issue={issue}/>
                </Box>
                <Box>
                    <EditIssueButton issueId={issue.id} />
                    <DeleteIssueButton issueId={issue.id}/>
                </Box>
            </Grid>
        </>
    );
};

export default IssuesDetailPage;
