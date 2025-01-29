'use client'
import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';
import { Button, Flex, Text } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'

// interface Props {
//     itemCount: number;
//     pageSize:number;
//     currenPage:number;
// }

const Pagination = ({itemCount,pageSize,currentPage}:{itemCount:number,pageSize:number,currentPage:number}) => {

    const router = useRouter();
    const searchParams = useSearchParams();

    const pageCount = Math.ceil(itemCount / pageSize);

    if(pageCount <= 1) return null;

    const changePage = (page:number) => {
        const params = new URLSearchParams(searchParams)
        params.set('page',page.toString());
        router.push('?' + params.toString())
    }

  return (
    <>
        <Flex align={'center'} gap={'2'} mt={'3'}>
            <Text size={'2'}>Page {currentPage} of {pageCount}</Text>
            <Button onClick={() => changePage(1)} color='gray' variant='soft' disabled={currentPage === 1}>
                <DoubleArrowLeftIcon className='cursor-pointer'/>
            </Button>
            <Button onClick={() => changePage(currentPage - 1)} color='gray' variant='soft' disabled={currentPage === 1}>
                <ChevronLeftIcon className='cursor-pointer'/>
            </Button>
            <Button  onClick={() => changePage(currentPage + 1)} color='gray' variant='soft' disabled={currentPage === pageCount}>
                <ChevronRightIcon className='cursor-pointer'/>
            </Button>
            <Button  onClick={() => changePage(pageCount)} color='gray' variant='soft' disabled={currentPage === pageCount}>
                <DoubleArrowRightIcon className='cursor-pointer'/>
            </Button>
        </Flex>
    </>
  )
}

export default Pagination