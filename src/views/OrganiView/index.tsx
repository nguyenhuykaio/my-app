import { usePagination } from '@ajna/pagination';
import { Box, HStack, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import { Fragment, useCallback, useMemo, useState, } from 'react';
import { BoxSearch } from '~/components';
import PaginationComponent from '~/components/Pagination';
import { ISearchOrganization, } from '~/dto';
import { useOrgani } from '~/hooks';

export const OrganiView = () => {

  const {
    organs,
    isLoading,
    keySearch,
    fieldSearch,
    setKeySearch,
    setFieldSearch,
    searchOrgan,
    resetData,
  } = useOrgani();

  const [pageSize, setPageSize] = useState(10);

  const { pages, pagesCount, currentPage, setCurrentPage } = usePagination({
    total: organs.length,
    limits: {
      outer: 2,
      inner: 2,
    },
    initialState: {
      pageSize: 10,
      currentPage: 1,
      isDisabled: false,
    },
  })

  const dataOrgans = useMemo(() => {
    if (organs.length > 0) {
      return organs.slice((currentPage === 1 ? currentPage - 1 : ((currentPage - 1) * pageSize)), currentPage * pageSize)
    }
    return [];
  }, [currentPage, pageSize, organs])

  const handlePageChange = useCallback(
    (nextPage: number): void => {
      // -> request new data using the page number
      console.log('request new data with ->', nextPage)
      setCurrentPage(nextPage)
    },
    [setCurrentPage,],
  )

  const renderBody = useCallback(() => {
    if (!organs.length) {
      return (
        <Text
          pt="30px"
        >
          Organiztion not found!
        </Text>
      )
    }
    return (
      <Fragment>


        {!isLoading &&
          <PaginationComponent
            pagesCount={pagesCount}
            currentPage={currentPage}
            isDisabled={isLoading}
            onPageChange={handlePageChange}
            pages={pages}
          />
        }

        {dataOrgans.map((item, idx) => {
          return (
            <SimpleGrid
              key={idx}
              w="full"
              spacing={2}
              columns={2}
              p="20px"
              border="1px solid #ccc"
            >
              {Object.keys(item).map((itemKey, idxKey) => {
                return (
                  <HStack key={idxKey}>

                    <Text
                      opacity={.9}
                    >
                      {itemKey}:
                    </Text>

                    <Text
                      fontWeight={600}
                    >
                      {Array.isArray(item[itemKey]) ?
                        item[itemKey].join(" , ")
                        :
                        item[itemKey]
                      }
                    </Text>


                  </HStack>
                )
              })
              }

            </SimpleGrid>
          )
        })}

        {!isLoading &&
          <PaginationComponent
            pagesCount={pagesCount}
            currentPage={currentPage}
            isDisabled={isLoading}
            onPageChange={handlePageChange}
            pages={pages}
          />
        }

      </Fragment>
    )
  }, [currentPage, dataOrgans, handlePageChange, isLoading, organs.length, pages, pagesCount])

  return (

    <Box>

      <BoxSearch
        isLoading={isLoading}
        keySearch={keySearch}
        fieldSearch={fieldSearch}
        setKeySearch={(e: string) => setKeySearch(e)}
        setFieldSearch={(e: string) => setFieldSearch(e)}
        search={searchOrgan}
        optionsSearch={new ISearchOrganization()}
        reset={resetData}
      />

      <VStack
        pt="20px"
        w="full"
        spacing={6}
      >
        {renderBody()}

      </VStack>

    </Box>
  )

}
