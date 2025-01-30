import { IssuesStatusBadge } from '@/app/components'
import { Issue } from '@prisma/client'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import ReactMarkdown from 'react-markdown'

const IssueDetails = ({issue}: {issue:Issue}) => {
    return (
        <>
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
        </>
    )
}

export default IssueDetails