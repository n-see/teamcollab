'use client'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {

    let router = useRouter();

    const handleDelete = async () => {
        await axios.delete(`/api/issues/${issueId}`)
            .catch((error) => {
                console.log(error)
            })
        router.push('/issues')
        router.refresh();
    }

    return (
        <>
            {/* <Button color='red' onClick={handleDelete}>
            
            Delete Issue
            
            </Button> */}
            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    <Button color="red" >Delete</Button>
                </AlertDialog.Trigger>
                <AlertDialog.Content maxWidth="450px">
                    <AlertDialog.Title>Delete</AlertDialog.Title>
                    <AlertDialog.Description size="2">
                        Are you sure? This action cannot be undone.
                    </AlertDialog.Description>

                    <Flex gap="3" mt="4" justify="end">
                        <AlertDialog.Cancel>
                            <Button variant="soft" color="gray">
                                Cancel
                            </Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action >
                            <Button variant="solid" color="red" onClick={handleDelete}>
                                Delete
                            </Button>
                        </AlertDialog.Action>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>
        </>
    )
}

export default DeleteIssueButton