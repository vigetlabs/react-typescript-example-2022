import { ThemeToggleButton } from '.';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/ThemeToggleButton',
  component: ThemeToggleButton,
} as ComponentMeta<typeof ThemeToggleButton>;

const Template: ComponentStory<typeof ThemeToggleButton> = (args) => (
  <ThemeToggleButton {...args} />
);

export const Default = Template.bind({});
Default.args = {
  children: 'Toggle theme',
};
