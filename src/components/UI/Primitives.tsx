import styled from "styled-components";
import { theme, focusStyles, buttonResetStyles } from "../../styles/theme";

export const Flex = styled.div<{
  $direction?: "row" | "column";
  $align?: "flex-start" | "center" | "flex-end" | "stretch";
  $justify?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around";
  $gap?: keyof typeof theme.spacing;
  $wrap?: boolean;
}>`
  display: flex;
  flex-direction: ${({ $direction = "row" }) => $direction};
  align-items: ${({ $align = "stretch" }) => $align};
  justify-content: ${({ $justify = "flex-start" }) => $justify};
  gap: ${({ $gap }) => ($gap ? theme.spacing[$gap] : 0)};
  flex-wrap: ${({ $wrap }) => ($wrap ? "wrap" : "nowrap")};
`;

export const Grid = styled.div<{
  $columns?: string;
  $rows?: string;
  $gap?: keyof typeof theme.spacing;
  $alignItems?: string;
}>`
  display: grid;
  grid-template-columns: ${({ $columns = "1fr" }) => $columns};
  grid-template-rows: ${({ $rows = "auto" }) => $rows};
  gap: ${({ $gap = "md" }) => theme.spacing[$gap]};
  align-items: ${({ $alignItems = "stretch" }) => $alignItems};
`;

export const Text = styled.span<{
  $size?: keyof typeof theme.typography.fontSizes;
  $weight?: keyof typeof theme.typography.fontWeights;
  $color?: string;
  $align?: "left" | "center" | "right";
}>`
  font-size: ${({ $size = "base" }) => theme.typography.fontSizes[$size]};
  font-weight: ${({ $weight = "normal" }) =>
    theme.typography.fontWeights[$weight]};
  color: ${({ $color = theme.colors.text.primary }) => $color};
  text-align: ${({ $align = "left" }) => $align};
  margin: 0;
`;

export const Heading = styled.h1<{
  $level?: 1 | 2 | 3 | 4 | 5 | 6;
  $size?: keyof typeof theme.typography.fontSizes;
  $weight?: keyof typeof theme.typography.fontWeights;
  $color?: string;
  $margin?: string;
}>`
  font-size: ${({ $size, $level = 1 }) => {
    if ($size) return theme.typography.fontSizes[$size];
    switch ($level) {
      case 1:
        return theme.typography.fontSizes["2xl"];
      case 2:
        return theme.typography.fontSizes.xl;
      case 3:
        return theme.typography.fontSizes.lg;
      default:
        return theme.typography.fontSizes.base;
    }
  }};
  font-weight: ${({ $weight = "semibold" }) =>
    theme.typography.fontWeights[$weight]};
  color: ${({ $color = theme.colors.text.primary }) => $color};
  margin: ${({ $margin = "0" }) => $margin};
  line-height: ${theme.typography.lineHeights.tight};
`;

export const Box = styled.div<{
  $p?: keyof typeof theme.spacing;
  $px?: keyof typeof theme.spacing;
  $py?: keyof typeof theme.spacing;
  $pt?: keyof typeof theme.spacing;
  $pr?: keyof typeof theme.spacing;
  $pb?: keyof typeof theme.spacing;
  $pl?: keyof typeof theme.spacing;
  $m?: keyof typeof theme.spacing;
  $mx?: keyof typeof theme.spacing;
  $my?: keyof typeof theme.spacing;
  $mt?: keyof typeof theme.spacing;
  $mr?: keyof typeof theme.spacing;
  $mb?: keyof typeof theme.spacing;
  $ml?: keyof typeof theme.spacing;
  $bg?: string;
  $borderRadius?: keyof typeof theme.borderRadius;
  $border?: string;
  $width?: string;
  $height?: string;
  $maxWidth?: string;
  $minHeight?: string;
}>`
  ${({ $p }) => $p && `padding: ${theme.spacing[$p]};`}
  ${({ $px }) =>
    $px &&
    `padding-left: ${theme.spacing[$px]}; padding-right: ${theme.spacing[$px]};`}
  ${({ $py }) =>
    $py &&
    `padding-top: ${theme.spacing[$py]}; padding-bottom: ${theme.spacing[$py]};`}
  ${({ $pt }) => $pt && `padding-top: ${theme.spacing[$pt]};`}
  ${({ $pr }) => $pr && `padding-right: ${theme.spacing[$pr]};`}
  ${({ $pb }) => $pb && `padding-bottom: ${theme.spacing[$pb]};`}
  ${({ $pl }) => $pl && `padding-left: ${theme.spacing[$pl]};`}
  
  ${({ $m }) => $m && `margin: ${theme.spacing[$m]};`}
  ${({ $mx }) =>
    $mx &&
    `margin-left: ${theme.spacing[$mx]}; margin-right: ${theme.spacing[$mx]};`}
  ${({ $my }) =>
    $my &&
    `margin-top: ${theme.spacing[$my]}; margin-bottom: ${theme.spacing[$my]};`}
  ${({ $mt }) => $mt && `margin-top: ${theme.spacing[$mt]};`}
  ${({ $mr }) => $mr && `margin-right: ${theme.spacing[$mr]};`}
  ${({ $mb }) => $mb && `margin-bottom: ${theme.spacing[$mb]};`}
  ${({ $ml }) => $ml && `margin-left: ${theme.spacing[$ml]};`}
  
  ${({ $bg }) => $bg && `background: ${$bg};`}
  ${({ $borderRadius }) =>
    $borderRadius && `border-radius: ${theme.borderRadius[$borderRadius]};`}
  ${({ $border }) => $border && `border: ${$border};`}
  ${({ $width }) => $width && `width: ${$width};`}
  ${({ $height }) => $height && `height: ${$height};`}
  ${({ $maxWidth }) => $maxWidth && `max-width: ${$maxWidth};`}
  ${({ $minHeight }) => $minHeight && `min-height: ${$minHeight};`}
`;

export const Input = styled.input<{
  $size?: "sm" | "md" | "lg";
  $hasError?: boolean;
}>`
  width: 100%;
  padding: ${({ $size = "md" }) => {
    switch ($size) {
      case "sm":
        return `${theme.spacing.sm} ${theme.spacing.md}`;
      case "lg":
        return `${theme.spacing.lg} ${theme.spacing.lg}`;
      default:
        return `${theme.spacing.md} ${theme.spacing.lg}`;
    }
  }};
  border: 1px solid
    ${({ $hasError }) =>
      $hasError ? theme.colors.error : theme.colors.border.light};
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.typography.fontSizes.base};
  background: ${theme.colors.background.white};
  box-sizing: border-box;
  transition: ${theme.transitions.fast};

  &::placeholder {
    color: ${theme.colors.text.placeholder};
  }

  &:focus {
    ${focusStyles}
  }

  &:disabled {
    background: ${theme.colors.background.muted};
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const ButtonPrimitive = styled.button<{
  $variant?: "primary" | "secondary" | "outline" | "ghost";
  $size?: "sm" | "md" | "lg";
  $fullWidth?: boolean;
}>`
  ${buttonResetStyles}
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};

  padding: ${({ $size = "md" }) => {
    switch ($size) {
      case "sm":
        return `${theme.spacing.sm} ${theme.spacing.md}`;
      case "lg":
        return `${theme.spacing.lg} ${theme.spacing["2xl"]}`;
      default:
        return `${theme.spacing.md} ${theme.spacing.lg}`;
    }
  }};

  font-size: ${({ $size = "md" }) => {
    switch ($size) {
      case "sm":
        return theme.typography.fontSizes.sm;
      case "lg":
        return theme.typography.fontSizes.lg;
      default:
        return theme.typography.fontSizes.base;
    }
  }};

  font-weight: ${theme.typography.fontWeights.medium};
  border-radius: ${theme.borderRadius.sm};
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};

  ${({ $variant = "primary" }) => {
    switch ($variant) {
      case "primary":
        return `
          background-color: ${theme.colors.primary};
          color: white;
          border: 1px solid ${theme.colors.primary};
          
          &:hover:not(:disabled) {
            background-color: ${theme.colors.primaryHover};
            border-color: ${theme.colors.primaryHover};
          }
        `;
      case "secondary":
        return `
          background-color: ${theme.colors.background.light};
          color: ${theme.colors.text.secondary};
          border: 1px solid ${theme.colors.border.light};
          
          &:hover:not(:disabled) {
            background-color: ${theme.colors.background.muted};
          }
        `;
      case "outline":
        return `
          background-color: transparent;
          color: ${theme.colors.primary};
          border: 1px solid ${theme.colors.primary};
          
          &:hover:not(:disabled) {
            background-color: ${theme.colors.primaryLight};
          }
        `;
      case "ghost":
        return `
          background-color: transparent;
          color: ${theme.colors.text.secondary};
          border: 1px solid transparent;
          
          &:hover:not(:disabled) {
            background-color: ${theme.colors.background.light};
          }
        `;
    }
  }}

  &:focus {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const IconWrapper = styled.div<{
  $size?: "sm" | "md" | "lg";
  $color?: string;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    width: ${({ $size = "md" }) => {
      switch ($size) {
        case "sm":
          return "16px";
        case "lg":
          return "24px";
        default:
          return "20px";
      }
    }};
    height: ${({ $size = "md" }) => {
      switch ($size) {
        case "sm":
          return "16px";
        case "lg":
          return "24px";
        default:
          return "20px";
      }
    }};
    color: ${({ $color = "currentColor" }) => $color};
  }
`;
