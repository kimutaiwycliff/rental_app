'use client';
import { useMutation } from '@tanstack/react-query';
import { AgentGetOne } from './types';
import { useTRPC } from '@/trpc/client';
import { useForm } from 'react-hook-form';
import { AgentInsertFormData, agentInsertSchema } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { CustomFormField } from '@/components/forms/FormField';

interface AgentFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  initialValues?: AgentGetOne;
}

export const AgentForm = ({
  onSuccess,
  onCancel,
  initialValues,
}: AgentFormProps) => {
  const trpc = useTRPC();
  const createAgent = useMutation(
    trpc.agents.create.mutationOptions({
      onSuccess: () => {},
      onError: () => {},
    })
  );
  const form = useForm<AgentInsertFormData>({
    resolver: zodResolver(agentInsertSchema),
    defaultValues: {
      name: initialValues?.name || '',
      instructions: initialValues?.instructions || '',
    },
  });

  const isEdit = !!initialValues?.id;
  const isPending = createAgent.isPending;

  const onSubmit = (values: AgentInsertFormData) => {
    if (isEdit) {
      console.log('Update agent');
    } else {
      createAgent.mutate(values);
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <CustomFormField name="name" label="Name" placeholder="Agent Name" />
      </form>
    </Form>
  );
};
