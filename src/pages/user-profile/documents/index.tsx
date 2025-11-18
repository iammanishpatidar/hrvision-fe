import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { Button } from '@fibonacci-innovative-solutions/hrms-design-library';
import { ChevronDownIcon, ChevronUpIcon, MoreVertical } from 'lucide-react';
import Upload from '../../../../assets/Upload.svg';
import { useState } from 'react';
import DataTable from '@/components/table/DataTables';
import { documentColumns, DocumentsColumns } from './components/documentColumns';
import UploadDocumentSideSheet from './components/UploadDocumentSideSheet';

const AccordionData = [
  { title: 'Employment-Related Documents' },
  { title: 'Policy & Compliance Documents' },
  { title: 'Identity & Verification Documents' },
];

const contractData: DocumentsColumns[] = [
  {
    type: 'Offer Letter',
    name: 'Internship Agreement',
    date: '01 Jan, 2019',
    documents: (
      <div className="flex gap-8">
        <div className="w-28 flex flex-col text-primary text-sm font-poppins font-normal underline leading-5 break-words">
          View Documents
        </div>
        <MoreVertical />
      </div>
    ),
  },
  {
    type: 'Contract',
    name: 'Full-time Employment Agreement',
    date: '15 Feb, 2020',
    documents: (
      <div className="flex gap-8">
        <div className="w-28 flex flex-col text-primary text-sm font-poppins font-normal underline leading-5 break-words">
          View Documents
        </div>
        <MoreVertical />
      </div>
    ),
  },
  {
    type: 'NDA',
    name: 'Non-Disclosure Agreement',
    date: '20 Mar, 2021',
    documents: (
      <div className="flex gap-8">
        <div className="w-28 flex flex-col text-primary text-sm font-poppins font-normal underline leading-5 break-words">
          View Documents
        </div>
        <MoreVertical />
      </div>
    ),
  },
  {
    type: 'Offer Letter',
    name: 'Junior Developer Offer',
    date: '05 May, 2021',
    documents: (
      <div className="flex gap-8">
        <div className="w-28 flex flex-col text-primary text-sm font-poppins font-normal underline leading-5 break-words">
          View Documents
        </div>
        <MoreVertical />
      </div>
    ),
  },
  {
    type: 'Contract',
    name: 'Freelance Agreement',
    date: '01 Jun, 2022',
    documents: (
      <div className="flex gap-8">
        <div className="w-28 flex flex-col text-primary text-sm font-poppins font-normal underline leading-5 break-words">
          View Documents
        </div>
        <MoreVertical />
      </div>
    ),
  },
  {
    type: 'Contract',
    name: 'Full-time Employment Agreement',
    date: '15 Feb, 2020',
    documents: (
      <div className="flex gap-8">
        <div className="w-28 flex flex-col text-primary text-sm font-poppins font-normal underline leading-5 break-words">
          View Documents
        </div>
        <MoreVertical />
      </div>
    ),
  },
  {
    type: 'Offer Letter',
    name: 'Junior Developer Offer',
    date: '05 May, 2021',
    documents: (
      <div className="flex gap-8">
        <div className="w-28 flex flex-col text-primary text-sm font-poppins font-normal underline leading-5 break-words">
          View Documents
        </div>
        <MoreVertical />
      </div>
    ),
  },
  {
    type: 'Offer Letter',
    name: 'Internship Agreement',
    date: '01 Jan, 2019',
    documents: (
      <div className="flex gap-8">
        <div className="w-28 flex flex-col text-primary text-sm font-poppins font-normal underline leading-5 break-words">
          View Documents
        </div>
        <MoreVertical />
      </div>
    ),
  },
];

const Documents = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);

  const handleToggleAccordian = (index: number) => {
    setOpenIndex(prevIndex => (prevIndex === index ? null : index));
  };

  const handleUploadClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSheetOpen(!isSheetOpen);
  };

  return (
    <>
      <div className="flex flex-col gap-6">
        {AccordionData.map((item, index) => (
          <Accordion
            key={index}
            type="single"
            collapsible={true}
            className="border border-gray-v2 rounded-2xl"
            onClick={() => handleToggleAccordian(index)}
          >
            <AccordionItem value={`item-${index}`}>
              <AccordionTrigger className="text-lg font-semibold text-primary flex justify-between items-center w-full">
                {item.title}
                {openIndex === index ? (
                  <div className="flex items-center justify-center gap-4">
                    <Button
                      variant="primary"
                      type="button"
                      className="rounded-[16px] w-[98px] py-1 px-2 text-base font-semibold font-Poppins"
                      onClick={e => handleUploadClick(e)}
                    >
                      Upload
                      <img src={Upload} alt="filter" className="ml-2" />
                    </Button>
                    <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4" />
                  </div>
                ) : (
                  <ChevronUpIcon className="text-muted-foreground pointer-events-none size-4" />
                )}
              </AccordionTrigger>
              {openIndex === index && (
                <AccordionContent className="m-4 p-4 border border-gray-v2 rounded-2xl">
                  <DataTable
                    data={contractData}
                    columns={documentColumns}
                    allowPagination={true}
                    allowSelection={false}
                    scrollHighlightedRowsIntoView={true}
                    highlightText="Important"
                    className="my-custom-table"
                  />
                </AccordionContent>
              )}
            </AccordionItem>
          </Accordion>
        ))}
      </div>
      <UploadDocumentSideSheet
        isUploadSheetOpen={isSheetOpen}
        setIsUploadSheetOpen={setIsSheetOpen}
      />
    </>
  );
};

export default Documents;
