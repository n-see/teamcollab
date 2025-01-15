import { Box } from '@radix-ui/themes';
import {Skeleton} from '@/app/components'

const LoadingNewIssuePage = () => {
  return (
    <>
      <Box className=''>
        <Skeleton/>
        <Skeleton height={200}/>
      </Box>
    </>
  )
}

export default LoadingNewIssuePage