import { prisma } from "@/prisma/client";
import Pagination from "./components/Pagination";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";



export default async function Home({searchParams}:{searchParams:{page:string}}) {

  const open = await prisma.issue.count({where:{status:'OPEN'}});
  const inProgress = await prisma.issue.count({where:{status:"In_PROGRESS"}});
  const closed = await prisma.issue.count({where:{status:"CLOSE"}});


  return (
    <>
   {/* <Pagination itemCount={100} pageSize={10} currentPage={parseInt(searchParams.page)}/> */}
    {/* <LatestIssues/> */}
   
    <Grid columns={{initial: '1', md:'2'}} gap={'5'} justify={'center'}>
      <Flex direction={"column"} gap={"5"} mt={'2'}>
      <IssueSummary open={open} inProgress={inProgress} closed={closed}/>
      <IssueChart open={open} inProgress={inProgress} closed={closed} />
      </Flex>
    </Grid>
    </>
  )
}
