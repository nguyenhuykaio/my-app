
import { useCallback, useEffect, useState } from "react"

import { USERS } from '~/data/users';
import { ORGANIZATIONS } from '~/data/organizations';
import { TICKETS } from '~/data/tickets';

import { ITicket, } from "~/dto";
import { useToast } from "@chakra-ui/react";

export const useTickets = () => {

  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast()

  const [lstTickets, setLstTickets] = useState<ITicket[]>([]);

  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [keySearch, setKeySearch] = useState("");
  const [fieldSearch, setFieldSearch] = useState("");

  const loadData = () => {
    try {

      const mapTickets = TICKETS.map((t) => ({
        ...t,
        organization_name: t?.organization_id ? ORGANIZATIONS.find(o => o._id === t.organization_id)?.name : "",
        assignee_name: t?.assignee_id ? USERS.find(u => u._id === t.assignee_id)?.name : "",
        submitter_name: t?.submitter_id ? USERS.find(u => u._id === t.submitter_id)?.name : "",
      }))

      // console.log({ mapTickets });
      setLstTickets(mapTickets);
      setTickets(mapTickets);
    } catch (error) {
      console.log({ error });

    }
  }

  const searchTickets = useCallback(() => {
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
        const newTickets = lstTickets.filter((_, idx) =>
          lstTickets[idx][fieldSearch]?.toString()?.toLowerCase().includes(keySearch.toLowerCase())
        )

        setTickets(newTickets);
      }

      setIsLoading(false);

    } catch (error) {
      setIsLoading(false);
      setTickets(lstTickets);
      console.log({ error });
    }
  }, [fieldSearch, keySearch, lstTickets,])

  const resetData = () => {
    setTickets(lstTickets);
    setFieldSearch("");
    setKeySearch("");
  }

  useEffect(() => {
    loadData()
  }, [])

  return {
    isLoading,
    tickets,
    keySearch,
    setKeySearch,
    fieldSearch,
    setFieldSearch,
    searchTickets,
    resetData,
  }
}