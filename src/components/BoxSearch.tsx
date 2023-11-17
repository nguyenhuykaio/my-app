import { HStack, Select, Input, Button } from "@chakra-ui/react"

export const BoxSearch = (props: {
    isLoading: boolean,
    keySearch: string,
    fieldSearch: string,
    setKeySearch: (e: string) => void,
    setFieldSearch: (e: string) => void,
    search: () => void,
    optionsSearch: any
    reset?: () => void,
}) => {

    const {
        isLoading,
        keySearch,
        fieldSearch,
        setKeySearch, setFieldSearch, search,
        optionsSearch,
        reset = () => { }
    } = props;

    return (
        <HStack
            spacing={4}
        >

            <Select
                placeholder='Select option'
                value={fieldSearch}
                onChange={(e) => {
                    setFieldSearch(e.target.value)
                }}
            >
                {Object.keys(optionsSearch).map((item, idx) =>
                    <option
                        value={item}
                        key={idx}
                    >
                        {item}
                    </option>
                )}
            </Select>

            <Input
                h={{ base: "38px", xl: "53px" }}
                p="0px"
                w="full"
                fontSize={{ base: "13px", xl: "16px" }}
                lineHeight={{ base: "19px", xl: "21px" }}
                color={`#7C3108`}
                _focus={{ boxShadow: 'none', borderColor: "transparent", borderBottom: "1px solid #000" }}
                _hover={{ background: "transparent", borderColor: "transparent", borderBottom: "1px solid #000" }}
                _placeholder={{
                    color: '#7C3108'
                }}
                type="text"
                background={"transparent"}
                borderColor={"transparent"}
                borderWidth={"1px"}
                borderStyle={"solid"}
                borderBottomColor={`#7C3108`}
                borderRadius={"0px"}
                placeholder={'Find what you want ...'}
                value={keySearch}
                onChange={(e) => {
                    setKeySearch(e.target.value)
                }}
            />

            <Button
                colorScheme='blue'
                px="30px"
                isDisabled={isLoading}
                isLoading={isLoading}
                onClick={search}
            >
                Search
            </Button>
            <Button
                colorScheme='blue'
                px="30px"
                isDisabled={isLoading}
                isLoading={isLoading}
                onClick={reset}
            >
                Reset
            </Button>
        </HStack>
    )
}