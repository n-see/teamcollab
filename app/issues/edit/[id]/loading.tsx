import { Box } from '@radix-ui/themes'
import Skeleton from 'react-loading-skeleton'

const LoadingEditPage = () => {
  return (
    <>
        <Box className="max-w-xl">
            <Skeleton/>
            <Skeleton height={'20rem'}/>
        </Box>
    </>
  )
}

export default LoadingEditPage