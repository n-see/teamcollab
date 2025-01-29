'use client'
import { Skeleton } from '@/app/components'
import { Issue, User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'

const  AssigneeSelect = ({issue}:{issue:Issue}) => {



   const{data:users,error,isLoading} = useUser()
    
    if(isLoading) return <Skeleton/>
    if(error) null

const assignIssue = (userId:string) => {
    const assignedToUserId = userId === 'Unassigned' ? null : userId
    axios.patch('/api/issues/' + issue.id,{assignedToUserId})
    .catch(() => {
        toast.error("Changes could not be saved.")
    })
    
}
  return (
      <>
        <Select.Root defaultValue={issue.assignedToUserId || "Unassigned"} onValueChange={assignIssue}>
            <Select.Trigger placeholder='Assign to:'/>
            <Select.Content>
                <Select.Group>
                    <Select.Label>Unassigned</Select.Label>
                    <Select.Item value={'Unassigned'}>Unassigned</Select.Item>
                    {users?.map(user => <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item> )}
                    
                </Select.Group>
            </Select.Content>
        </Select.Root>
            <Toaster 
                toastOptions={{
                    style:{
                        background:'gray'
                    }
                }}
            />
  </>
  )
}

const useUser = () => useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/users').then(res => res.data),
    staleTime: 60 * 1000, //60 sec
    retry: 3
})

export default  AssigneeSelect