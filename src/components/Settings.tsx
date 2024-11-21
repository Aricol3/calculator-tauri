import {
  BreadcrumbItem,
  Breadcrumbs,
  Button, Divider
} from "@nextui-org/react";
import { useState } from "react";
import { COLOR, ColorType, VARIANT, VariantType } from "../types.ts";

const Settings = () => {
  const [color, setColor] = useState<ColorType>(COLOR.DEFAULT);
  const [variant, setVariant] = useState<VariantType>(VARIANT.SOLID);

  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mt-4">
      {/*<Dropdown>*/}
      {/*  <DropdownTrigger>*/}
      {/*    <Button*/}
      {/*      variant="solid"*/}
      {/*    >*/}
      {/*      Color*/}
      {/*    </Button>*/}
      {/*  </DropdownTrigger>*/}
      {/*  <DropdownMenu aria-label="Static Actions">*/}
      {/*    <DropdownItem className={`text-${COLOR.DEFAULT}`} key={COLOR.DEFAULT} color={COLOR.DEFAULT}*/}
      {/*                  onClick={() => setColor(COLOR.DEFAULT)}>Default</DropdownItem>*/}
      {/*    <DropdownItem className={`text-${COLOR.PRIMARY}`} key={COLOR.PRIMARY} color={COLOR.PRIMARY}*/}
      {/*                  onClick={() => setColor(COLOR.PRIMARY)}>Primary</DropdownItem>*/}
      {/*    <DropdownItem className={`text-${COLOR.SECONDARY}`} key={COLOR.SECONDARY} color={COLOR.SECONDARY}*/}
      {/*                  onClick={() => setColor(COLOR.SECONDARY)}>Secondary</DropdownItem>*/}
      {/*    <DropdownItem className={`text-${COLOR.SUCCESS}`} key={COLOR.SUCCESS} color={COLOR.SUCCESS}*/}
      {/*                  onClick={() => setColor(COLOR.SUCCESS)}>Success</DropdownItem>*/}
      {/*    <DropdownItem className={`text-${COLOR.WARNING}`} key={COLOR.WARNING} color={COLOR.WARNING}*/}
      {/*                  onClick={() => setColor(COLOR.WARNING)}>Warning</DropdownItem>*/}
      {/*    <DropdownItem className={`text-${COLOR.DANGER}`} key={COLOR.DANGER} color={COLOR.DANGER}*/}
      {/*                  onClick={() => setColor(COLOR.DANGER)}>Danger</DropdownItem>*/}
      {/*  </DropdownMenu>*/}
      {/*</Dropdown>*/}
      {/*<Dropdown>*/}
      {/*  <DropdownTrigger>*/}
      {/*    <Button*/}
      {/*      variant="solid"*/}
      {/*    >*/}
      {/*      Variant*/}
      {/*    </Button>*/}
      {/*  </DropdownTrigger>*/}
      {/*  <DropdownMenu aria-label="Static Actions">*/}
      {/*    <DropdownItem key={VARIANT.SOLID} onClick={() => setVariant(VARIANT.SOLID)}>Solid</DropdownItem>*/}
      {/*    <DropdownItem key={VARIANT.FADED} onClick={() => setVariant(VARIANT.FADED)}>Faded</DropdownItem>*/}
      {/*    <DropdownItem key={VARIANT.BORDERED} onClick={() => setVariant(VARIANT.BORDERED)}>Bordered</DropdownItem>*/}
      {/*    <DropdownItem key={VARIANT.LIGHT} onClick={() => setVariant(VARIANT.LIGHT)}>Light</DropdownItem>*/}
      {/*    <DropdownItem key={VARIANT.FLAT} onClick={() => setVariant(VARIANT.FLAT)}>Flat</DropdownItem>*/}
      {/*    <DropdownItem key={VARIANT.GHOST} onClick={() => setVariant(VARIANT.GHOST)}>Ghost</DropdownItem>*/}
      {/*    <DropdownItem key={VARIANT.SHADOW} onClick={() => setVariant(VARIANT.SHADOW)}>Shadow</DropdownItem>*/}
      {/*  </DropdownMenu>*/}
      {/*</Dropdown>*/}

      <div className="w-full">
        <p className="text-small text-default-500">Colors</p>
        <Divider />
      </div>
      <Breadcrumbs
        size="sm"
        onAction={(key) => {
          // @ts-ignore
          setColor(key);
        }}
        classNames={{
          list: "gap-2"
        }}
        itemClasses={{
          item: [
            "px-4 py-0.5 border-small border-default-400 rounded-small",
            `data-[current=true]:border-${color} data-[current=true]:bg-${color === "default" ? "foreground" : color} data-[current=true]:text-background transition-colors`,
            "data-[disabled=true]:border-default-400 data-[disabled=true]:bg-default-100"
          ],
          separator: "hidden"
        }}
      >
        <BreadcrumbItem key={COLOR.DEFAULT} isCurrent={color === COLOR.DEFAULT}>
          Default
        </BreadcrumbItem>
        <BreadcrumbItem key={COLOR.PRIMARY} isCurrent={color === COLOR.PRIMARY}>
          Blue
        </BreadcrumbItem>
        <BreadcrumbItem key={COLOR.SECONDARY} isCurrent={color === COLOR.SECONDARY}>
          Purple
        </BreadcrumbItem>
        <BreadcrumbItem key={COLOR.SUCCESS} isCurrent={color === COLOR.SUCCESS}>
          Green
        </BreadcrumbItem>
        <BreadcrumbItem key={COLOR.WARNING} isCurrent={color === COLOR.WARNING}>
          Yellow
        </BreadcrumbItem>
        <BreadcrumbItem key={COLOR.DANGER} isCurrent={color === COLOR.DANGER}>
          Red
        </BreadcrumbItem>
      </Breadcrumbs>

      <div className="w-full">
        <p className="text-small text-default-500">Variants</p>
        <Divider />
      </div>
      <Breadcrumbs
        size="sm"
        onAction={(key) => {
          // @ts-ignore
          setVariant(key);
        }}
        classNames={{
          list: "gap-2"
        }}
        itemClasses={{
          item: [
            "px-4 py-0.5 border-small border-default-400 rounded-small",
            `data-[current=true]:border-${color} data-[current=true]:bg-${color === "default" ? "foreground" : color} data-[current=true]:text-background transition-colors`,
            "data-[disabled=true]:border-default-400 data-[disabled=true]:bg-default-100"
          ],
          separator: "hidden"
        }}
      >
        <BreadcrumbItem key={VARIANT.SOLID} isCurrent={variant === VARIANT.SOLID}>
          Solid
        </BreadcrumbItem>
        <BreadcrumbItem key={VARIANT.FADED} isCurrent={variant === VARIANT.FADED}>
          Faded
        </BreadcrumbItem>
        <BreadcrumbItem key={VARIANT.BORDERED} isCurrent={variant === VARIANT.BORDERED}>
          Bordered
        </BreadcrumbItem>
        <BreadcrumbItem key={VARIANT.LIGHT} isCurrent={variant === VARIANT.LIGHT}>
          Light
        </BreadcrumbItem>
        <BreadcrumbItem key={VARIANT.FLAT} isCurrent={variant === VARIANT.FLAT}>
          Flat
        </BreadcrumbItem>
        <BreadcrumbItem key={VARIANT.GHOST} isCurrent={variant === VARIANT.GHOST}>
          Ghost
        </BreadcrumbItem>
        <BreadcrumbItem key={VARIANT.SHADOW} isCurrent={variant === VARIANT.SHADOW}>
          Shadow
        </BreadcrumbItem>
      </Breadcrumbs>

      <div className="w-full text-center">
        <Button color={color} variant={variant}>button</Button>
      </div>
    </div>
  );
};

export default Settings;