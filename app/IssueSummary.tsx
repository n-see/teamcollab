import { Status } from '@prisma/client';
import { Card, Flex, Text } from '@radix-ui/themes';
import Link from 'next/link';




const IssueSummary = ({open, inProgress, closed}:{open:number;inProgress:number;closed:number}) => {

    const containers: {
        label:string;
        value: number;
        status: Status;
    }[] = [
        {label:"Open Issues", value:open, status:"OPEN"},
        {label:"In-Progress Issues", value:inProgress, status:'In_PROGRESS'},
        {label:"Closed Issues", value:closed, status:"CLOSE"},
    ]

  return (
    <>
        <Flex gap={"4"}>
            {containers.map((container) => (
                <Card key={container.label}>
                    <Flex direction={'column'} gap={'1'}>
                        <Link className='text-sm font-medium' href={`/issues/list?status=${container.status}`}>
                            <Text>{container.label}</Text>
                        </Link>
                        <Text align={'center'} size={'5'} className='font-bold'>{container.value}</Text>
                    </Flex>
                </Card>
            ))}
        </Flex>
    </>
  )
}

export default IssueSummary