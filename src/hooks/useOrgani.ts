
import { useCallback, useEffect, useState } from "react"

import { USERS } from '~/data/users';
import { ORGANIZATIONS } from '~/data/organizations';
import { TICKETS } from '~/data/tickets';

import { IOrganization } from "~/dto";
import { useToast } from "@chakra-ui/react";

export const useOrgani = () => {

  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast()

  const [lstOrgan, setLstOrgan] = useState<IOrganization[]>([]);

  const [organs, setOrgans] = useState<IOrganization[]>([]);
  const [keySearch, setKeySearch] = useState("");
  const [fieldSearch, setFieldSearch] = useState("");

  const loadData = () => {
    try {

      const mapOrgans = ORGANIZATIONS.map((o) => ({
        ...o,
        users: USERS.filter(u => u.organization_id ? u.organization_id === o._id : false).map(u => u.name),
        tickets: TICKETS.filter(t => t.organization_id ? t.organization_id === o._id : false).map(t => t.subject),
      }))

      // console.log({ mapOrgans });
      setLstOrgan(mapOrgans);
      setOrgans(mapOrgans);
    } catch (error) {
      console.log({ error });
    }
  }

  const searchOrgan = useCallback(() => {
    setIsLoading(true);
    try {

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
        const newOrgan = lstOrgan.filter((_, idx) =>
          lstOrgan[idx][fieldSearch]?.toString()?.toLowerCase().includes(keySearch.toLowerCase())
        )

        setOrgans(newOrgan);
      }

      setIsLoading(false);

    } catch (error) {
      setIsLoading(false);
      setOrgans(lstOrgan);
      console.log({ error });
    }
  }, [fieldSearch, keySearch, lstOrgan])

  const resetData = () => {
    setOrgans(lstOrgan);
    setFieldSearch("");
    setKeySearch("");
  }

  useEffect(() => {
    loadData()
  }, [])

  return {
    isLoading,
    organs,
    keySearch,
    setKeySearch,
    fieldSearch,
    setFieldSearch,
    searchOrgan,
    resetData,
  }
}