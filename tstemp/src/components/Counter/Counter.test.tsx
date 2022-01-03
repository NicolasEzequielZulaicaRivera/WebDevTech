import { render, screen } from '@testing-library/react';
import {Counter} from '.';


describe('Counter', () => {
  it('should render', () => {
    const count = <Counter />
    render(count);
    expect(screen.getByText('0')).toBeInTheDocument();
  });
  it('should add', () => {
    const count = <Counter />
    render(count);
    expect(screen.getByText('0')).toBeInTheDocument();
    
    expect(screen.queryByText('1')).not.toBeInTheDocument();
    expect(screen.queryByText('2')).not.toBeInTheDocument();
    
    screen.getByText('[>>]').click();
    expect(screen.getByText('1')).toBeInTheDocument();
    
    expect(screen.queryByText('0')).not.toBeInTheDocument();
    expect(screen.queryByText('2')).not.toBeInTheDocument();

    screen.getByText('[>>]').click();
    expect(screen.getByText('2')).toBeInTheDocument();
  });
  it('should subtract', () => {
    const count = <Counter />
    render(count);
    expect(screen.getByText('0')).toBeInTheDocument();
    
    expect(screen.queryByText('-1')).not.toBeInTheDocument();
    expect(screen.queryByText('-2')).not.toBeInTheDocument();
    
    screen.getByText('[<<]').click();
    expect(screen.getByText('-1')).toBeInTheDocument();
    
    expect(screen.queryByText('0')).not.toBeInTheDocument();
    expect(screen.queryByText('-2')).not.toBeInTheDocument();

    screen.getByText('[<<]').click();
    expect(screen.getByText('-2')).toBeInTheDocument();
  });

  it('should add and subtract', () => {
    const count = <Counter />
    render(count);
    expect(screen.getByText('0')).toBeInTheDocument();
    
    const add = () => screen.getByText('[>>]').click();
    const sub = () => screen.getByText('[<<]').click();

    add();
    add();
    sub();

    add();
    add();
    sub();

    sub();
    
    expect(screen.getByText('1')).toBeInTheDocument();

  });
});
