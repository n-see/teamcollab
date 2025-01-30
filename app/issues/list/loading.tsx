import { Skeleton } from '@/app/components'
import { Table } from '@radix-ui/themes'

import IssuesActions from './IssuesActions'

const issues = [1,2,3,4,5]

const LoadingIssuesPage = () => {
  return (
    <>  
        <IssuesActions/>
        <Table.Root variant='surface'>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className='hidden md:table-cell'>Create</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {issues.map(issue => (
              <Table.Row key={issue}>
                <Table.Cell>
                  <Skeleton baseColor="#202020" highlightColor="#444"/>
                  <div className='block md:hidden'>
                    <Skeleton baseColor="#202020" highlightColor="#444"/>          
                  </div>
                </Table.Cell>
                <Table.Cell className='hidden md:table-cell'><Skeleton baseColor="#202020" highlightColor="#444"/></Table.Cell>
                <Table.Cell className='hidden md:table-cell'><Skeleton baseColor="#202020" highlightColor="#444"/></Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
    </>
    
  )
}

export default LoadingIssuesPage