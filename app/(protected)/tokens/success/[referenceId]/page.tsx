import { ContentLayout } from "@/components/base/protected/content-layout";
import PaymentResultCard from "@/components/pages/tokens/payment-result-card";
import getTransaction from "@/lib/actions";

export default async function TokensSuccessPage({
  params,
}: {
  params: { referenceId: string };
}) {
  const { referenceId } = params;
  const transaction = await getTransaction({ referenceId });

  return (
    <ContentLayout title="Tokens">
      <div className="flex h-full items-center justify-center">
        <PaymentResultCard transaction={transaction} />
      </div>
    </ContentLayout>
  );
}
