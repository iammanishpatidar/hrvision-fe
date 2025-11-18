import {
  Button,
  Drawer,
  Input,
  Typography,
} from '@fibonacci-innovative-solutions/hrms-design-library';
import crossIcon from './../../../../../assets/temp/crossIcon.svg';
import React from 'react';

interface AddCategorySheetProps {
  showAddCategorySheet: boolean;
  onClose: () => void;
}

const AddCategorySheet: React.FC<AddCategorySheetProps> = ({ showAddCategorySheet, onClose }) => {
  return (
    <Drawer
      isOpen={showAddCategorySheet}
      onClose={onClose}
      position="right"
      width="450px"
      className="p-6 rounded-tl-[20px] rounded-bl-[20px] overflow-y-auto"
    >
      <div className="flex justify-end items-center w-full">
        <img
          src={crossIcon}
          alt="crossIcon"
          className="w-11 h-11 cursor-pointer"
          onClick={onClose}
        />
      </div>
      <Typography tag="h3" className="text-primary text-left w-full mb-6">
        Add Category
      </Typography>

      <div className="flex items-end justify-between flex-col h-[calc(100vh-150px)]">
        <div className="space-y-2.5 w-full">
          <Input
            theme={{
              labelStyle: 'text-primaryText text-sm font-medium',
              inputStyle: 'h-12 text-sm font-normal text-primaryText',
            }}
            label="Category Name"
            placeholder="Enter category name"
            className="w-full"
            type="text"
            value=""
            onChange={() => {}}
          />
        </div>

        <div className="flex justify-end ">
          <Button
            variant="primary"
            type="button"
            className="w-[194px] h-input-default !rounded-2xl"
          >
            Save Category
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

export default AddCategorySheet;
