import { prisma } from '@/prisma/client'
import { Box, Button, Table } from '@radix-ui/themes'
import Link from '../components/Link'
import React from 'react'
import IssuesStatusBadge from '../components/IssuesStatusBadge'
import delay from 'delay'

const IssuesPage = async () => {

   const issues = await prisma.issue.findMany();

  await delay(4000)

  return (
    <>
      <Box>
        <Box className='mb-5'>
          <Button>
            {" "}
            <Link href={"/issues/new"}>New Issue</Link>
          </Button>
        </Box>
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
              <Table.Row key={issue.id}>
                <Table.Cell>
                  <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                  <div className='block md:hidden'>
                    <IssuesStatusBadge status={issue.status} />
                  </div>
                </Table.Cell>
                <Table.Cell className='hidden md:table-cell'><IssuesStatusBadge status={issue.status} /></Table.Cell>
                <Table.Cell className='hidden md:table-cell'>{issue.createdAt.toDateString()}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
    </>
  )
}

export default IssuesPage