"use client";

import { Tabs } from "@chakra-ui/react";

import { MyRequestsPanel } from "@/app/(system)/wfh/MyRequestsPanel";
import { OrgOverviewPanel } from "@/app/(system)/wfh/OrgOverviewPanel";
import { TeamRequestsPanel } from "@/app/(system)/wfh/TeamRequestsPanel";
import type { WfhRequestRow } from "@/data/queries";
import type { Employee } from "@/types/employee";

type WfhClientProps = {
  employee: Employee;
  myRequests: WfhRequestRow[];
  teamRequests: WfhRequestRow[];
  allRequests: WfhRequestRow[];
  isApprover: boolean;
  isHr: boolean;
};

export function WfhClient({ employee, myRequests, teamRequests, allRequests, isApprover, isHr }: WfhClientProps) {
  const defaultTab = isApprover ? "team" : isHr ? "overview" : "mine";

  return (
    <Tabs.Root defaultValue={defaultTab}>
      <Tabs.List gap="20px">
        <Tabs.Trigger value="mine">My requests</Tabs.Trigger>
        {isApprover && <Tabs.Trigger value="team">Team requests</Tabs.Trigger>}
        {isHr && <Tabs.Trigger value="overview">Organisation overview</Tabs.Trigger>}
      </Tabs.List>

      <Tabs.Content value="mine" p="0" pt="14px">
        <MyRequestsPanel employee={employee} requests={myRequests} />
      </Tabs.Content>

      {isApprover && (
        <Tabs.Content value="team" p="0" pt="14px">
          <TeamRequestsPanel requests={teamRequests} />
        </Tabs.Content>
      )}

      {isHr && (
        <Tabs.Content value="overview" p="0" pt="14px">
          <OrgOverviewPanel requests={allRequests} />
        </Tabs.Content>
      )}
    </Tabs.Root>
  );
}
