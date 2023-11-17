import { useToast } from '@chakra-ui/react'
import { useCallback, useEffect, useState, } from "react"

import { USERS } from '~/data/users';
import { ORGANIZATIONS } from '~/data/organizations';
import { TICKETS } from '~/data/tickets';

import { IUser } from "~/dto";

export const useUser = () => {

  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast()

  const [lstUser, setLstUser] = useState<IUser[]>([]);

  const [users, setUsers] = useState<IUser[]>([]);
  const [keySearch, setKeySearch] = useState("");
  const [fieldSearch, setFieldSearch] = useState("");
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const loadData = () => {
    try {

      const mapUser = USERS.map((u) => ({
        ...u,
        organization_name: u?.organization_id ? ORGANIZATIONS.find(o => o._id === u.organization_id).name : "",
        tickets: u?.organization_id
          ? TICKETS.filter(t => t.organization_id === u.organization_id).map(i => i.subject)
          : [],
      }))

      // console.log({ mapUser });
      setLstUser(mapUser);
      setUsers(mapUser);
    } catch (error) {
      console.log({ error });
    }
  }

  const searchUser = useCallback(() => {
    setIsLoading(true);
    try {
      // console.log({ keySearch });

      let rs = true;

      if (!keySearch || !fieldSearch) {
        rs = false;
        toast({
          title: 'Warning search.',
          description: "keySearch or fieldSearch empty!",
          status: 'warning',
          duration: 9000,
          isClosable: true,
        })
      }

      if (rs) {
        const newUser = lstUser.filter((_, idx) =>
          lstUser[idx][fieldSearch]?.toString()?.toLowerCase().includes(keySearch.toLowerCase())
        )
        setUsers(newUser);
      }

      setIsLoading(false);

    } catch (error) {
      setIsLoading(false);
      setUsers(lstUser);
      console.log({ error });
    }
  }, [fieldSearch, keySearch, lstUser,])

  const resetData = () => {
    setUsers(lstUser);
    setFieldSearch("");
    setKeySearch("");
  }

  useEffect(() => {
    loadData()
  }, [])

  return {
    isLoading,
    users,
    keySearch,
    setKeySearch,
    fieldSearch,
    setFieldSearch,
    searchUser,
    pageSize,
    setPageSize,
    pageIndex,
    setPageIndex,
    resetData,
  }
}