import type { ResumeData } from '@/data/resume/types';

const fieldRowClassName =
  'grid min-w-0 grid-cols-[minmax(4.5rem,6rem)_1fr] items-baseline gap-x-3 gap-y-0.5';
const labelClassName = 'shrink-0 font-normal';
const valueClassName = 'min-w-0';

type ResumeBasicInfoSectionProps = {
  basicInfo: ResumeData['basicInfo'];
};

export default function ResumeBasicInfoSection({
  basicInfo,
}: Readonly<ResumeBasicInfoSectionProps>) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold">基本情報</h2>
      <dl className="space-y-2 text-sm sm:text-base">
        <div className={fieldRowClassName}>
          <dt className={labelClassName}>氏名</dt>
          <dd className={valueClassName}>{basicInfo.name}</dd>
        </div>
        <div className={fieldRowClassName}>
          <dt className={labelClassName}>生年月日</dt>
          <dd className={valueClassName}>{basicInfo.birthday}</dd>
        </div>
        <div className={fieldRowClassName}>
          <dt className={labelClassName}>居住地</dt>
          <dd className={valueClassName}>{basicInfo.address}</dd>
        </div>
        <div className={fieldRowClassName}>
          <dt className={labelClassName}>電話</dt>
          <dd className={valueClassName}>{basicInfo.phone}</dd>
        </div>
        <div className={fieldRowClassName}>
          <dt className={labelClassName}>メール</dt>
          <dd className={`${valueClassName} break-all`}>{basicInfo.email}</dd>
        </div>
        <div className={fieldRowClassName}>
          <dt className={labelClassName}>稼働形態</dt>
          <dd className={valueClassName}>{basicInfo.employmentType}</dd>
        </div>
      </dl>
    </section>
  );
}
