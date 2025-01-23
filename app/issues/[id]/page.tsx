import { prisma } from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import delay from "delay";
import { notFound } from "next/navigation";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth/authOptions";
import AssigneeSelect from "./AssigneeSelect";

const IssuesDetailPage = async ({ params }: { params: { id: string } }) => {

    const sessions = await getServerSession(authOptions);
    

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) },
    });

    if (!issue) notFound();


    return (
        <>
            <Grid columns={{initial:"1", md:'5'}} gap={"5"}>
                <Box className="md:col-span-4">
                    <IssueDetails issue={issue}/>
                </Box>
                { sessions && <Box>
                    <Flex direction={'column'} gap={'4'}>
                        <AssigneeSelect/>
                        <EditIssueButton issueId={issue.id} />
                        <DeleteIssueButton issueId={issue.id}/>

                    </Flex>
                </Box>}
            </Grid>
        </>
    );
};

export default IssuesDetailPage;
