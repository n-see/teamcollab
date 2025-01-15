import { Box, Card, Flex } from "@radix-ui/themes";
import {Skeleton} from '@/app/components'


const LoadingIssueDetailPage = () => {
  return (
    <>
      <Box className="max-w-xl">
        <Skeleton baseColor="#202020" highlightColor="#444"/>
        <Flex gap={"3"} my={"2"}>
          <Skeleton width={"5rem"} baseColor="#202020" highlightColor="#444"/>
          <Skeleton width={"5rem"} baseColor="#202020" highlightColor="#444"/>
        </Flex>
        <Card className="prose">
          <Skeleton count={3} baseColor="#202020" highlightColor="#444"/>
        </Card>
      </Box>
    </>
  );
};

export default LoadingIssueDetailPage;
