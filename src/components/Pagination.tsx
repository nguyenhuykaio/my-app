import { FC } from 'react'
import {
  Pagination,
  PaginationPage,
  PaginationNext,
  PaginationPrevious,
  PaginationPageGroup,
  PaginationContainer,
  PaginationSeparator,
} from '@ajna/pagination'
import { PaginationProps } from '@ajna/pagination/dist/components/Pagination'
import { Text } from '@chakra-ui/react'

const PaginationCustom = Pagination as FC<PaginationProps & { children: any }>

const PaginationComponent = ({
  pagesCount,
  currentPage,
  isDisabled,
  onPageChange,
  pages,
}) => {
  return (
    <PaginationCustom
      pagesCount={pagesCount}
      currentPage={currentPage}
      isDisabled={isDisabled}
      onPageChange={onPageChange}
    >
      <PaginationContainer align="center" justify="center" p={4} w="full">
        <PaginationPrevious bg="transparent">
          <Text
            fontSize={{
              base: '10px',
              lg: '13px',
            }}
          >
            {'Previous'}
          </Text>
        </PaginationPrevious>
        <PaginationPageGroup
          isInline
          align="center"
          separator={<PaginationSeparator fontSize="sm" w={7} jumpSize={11} />}
        >
          {pages.map((page: number) => (
            <PaginationPage
              w={{
                base: 8,
                lg: 10,
              }}
              h={{
                base: 8,
                lg: 10,
              }}
              bg="#E0E0E0"
              key={`pagination_page_${page}`}
              page={page}
              fontSize="12px"
              _hover={{
                bg: '#ee3824',
                color: 'white',
                opacity: .8
              }}
              _active={{
                bg: '#ee3824',
                opacity: .8
              }}
              _focus={{
                bg: '#ee3824',
                opacity: .8
              }}
              _current={{
                opacity: .8,
                bg: '#ee3824',
                fontSize: '12px',
                fontWeight: 500,
                w: {
                  base: 8,
                  lg: 10,
                },
                color: 'white',
              }}
            />
          ))}
        </PaginationPageGroup>
        <PaginationNext bg="transparent">
          <Text
            fontSize={{
              base: '10px',
              lg: '13px',
            }}
          >
            {'Next'}
          </Text>
        </PaginationNext>
      </PaginationContainer>
    </PaginationCustom>
  )
}

export default PaginationComponent
