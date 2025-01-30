import { IssuesStatusBadge } from "@/app/components";
import Pagination from "@/app/components/Pagination";
import { prisma } from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Box, Link, Table } from "@radix-ui/themes";
import NextLink from "next/link";
import IssuesActions from "./IssuesActions";


type SearchParams = Promise<{ status: Status, orderBy:keyof Issue,page:string}>;

interface Props {
  searchParams: SearchParams;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    { label: "Issues", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    { label: "Create", value: "createdAt", className: "hidden md:table-cell" },
  ];

  const _searchParams = await searchParams;
  const statuses = Object.values(Status);

  const status = statuses.includes(_searchParams.status)
    ? _searchParams.status
    : undefined;

  console.log(_searchParams.status);

  const orderBy = columns.map(column => column.value).includes(_searchParams.orderBy)
  ? {[_searchParams.orderBy]:'asc'}
  : undefined

  const page = parseInt(_searchParams.page) || 1;
  const pageSize = 10;


  const issues = await prisma.issue.findMany({
    where: { status },
    orderBy,
    skip: (page -1) * pageSize,
    take: pageSize

});

const issueCount = await prisma.issue.count({where: {status}});

  return (
    <>
      <Box>
        <IssuesActions />
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              {columns.map((column) => (
                <Table.ColumnHeaderCell key={column.value} className={column.className}>
                  <NextLink href={{query:{..._searchParams,orderBy: column.value}}}>
                    {column.label}
                  </NextLink>
                  {column.value === _searchParams.orderBy && <ArrowUpIcon className='inline'/> }
                </Table.ColumnHeaderCell>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {issues.map((issue) => (
              <Table.Row key={issue.id}>
                <Table.Cell>
                  <Link href={`/issues/${issue.id}`}>{issue.title}</Link>

                  <div className="block md:hidden">
                    <IssuesStatusBadge status={issue.status} />
                  </div>
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  <IssuesStatusBadge status={issue.status} />
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  {issue.createdAt.toDateString()}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
        <Pagination pageSize={pageSize} currentPage={page} itemCount={issueCount}/>
      </Box>
    </>
  );
};

export default IssuesPage;
