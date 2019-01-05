import React from 'react'
import styled, { css } from 'styled-components'
import { compose, withProps, branch, renderComponent } from 'recompose'
import { range, map, isEqual, first, slice, lt, size, join } from 'lodash'

const pairwise = list => {
  if (lt(size(list), 2)) {
    return []
  }

  const rest = slice(list, 1)
  const pairs = map(rest, item => [first(list), item])
  return [...pairs, ...pairwise(rest)]
}

const Carousel = styled.ul`
  width: 100%;
  height: 100%;
  min-height: 400px;
  overflow: hidden;
  text-align: center;
  position: relative;
  padding: 0;
  list-style: none;
`

const Slide = styled.li`
  height: 100%;
  right: 0;
  position: absolute;
  display: none;
  overflow-y: auto;
  top: 0;
  left: 0;
`

const Indicator = styled.label`
  display: none;
`

const Control = styled.label`
`

const createActivatorCSS = total => {
  const style = join(map(range(1, total + 1), (idx) => `
    :nth-of-type(${idx}):checked ~ ${Slide}:nth-of-type(${idx}) {
      display: block;
      animation: showSlide 0.5s
    }

    :nth-of-type(${idx}):checked ~ ${Indicator}:nth-of-type(${idx}) {
      display: block;
    }

    :nth-of-type(${idx}):checked ~ ${Control}:nth-of-type(${idx}) {
      display: block;
    }
  `))

  return css`${style}`
}

const Activator = styled.input`
  ${({ total }) => createActivatorCSS(total)};
`

const ControlsContainer = styled.div`
  display: none;
`

const ControlForward = styled(Control)`
`

const ControlBackward = styled(Control)`
`

const IndicatorsContainer = styled.div`
`

const ForOrBackwardControl = branch(({ idx }) => idx % 2, renderComponent(({ item }) => (
  <ControlForward htmlFor={item.id} />
)))(({ item }) => (
  <ControlBackward htmlFor={item.id} />
))

const ControlsPair = ({ pair }) => map(pair, (item, idx) => (
  <ForOrBackwardControl item={item} idx={idx} key={join(['control', item.id], '')} />
))

const Controls = ({ items }) => map(pairwise(items), pair => (
  <ControlsContainer key={join(['pair', ...map(pair, ({ id }) => id)], '')}>
    <ControlsPair pair={pair} />
  </ControlsContainer>
))

const IndicatorsList = ({ items }) => map(items, item => (
  <Indicator htmlFor={item.id} key={join(['indicator', item.id], '')}>{item.id}</Indicator>
))

const Indicators = ({ items }) => (
  <IndicatorsContainer>
    <IndicatorsList items={items} />
  </IndicatorsContainer>
)

const Activators = ({ items }) => map(items, (item, idx) => (
  <Activator
    key={join(['activator', item.id])}
    type='radio'
    total={size(items)}
    id={item.id}
    defaultChecked={isEqual(idx, 0)} />
))

const Slides = ({ items }) => map(items, item => (
  <Slide key={join(['slide', item.id], '')}>
    <h1>Item {item.id}</h1>
  </Slide>
))

const FullCarousel = ({ items }) => (
  <Carousel>
    <Activators items={items} />
    <Controls items={items} />
    <Slides items={items} />
    <Indicators items={items} />
  </Carousel>
)

export default compose(withProps({
  items: map(range(3), id => ({ id }))
}))(FullCarousel)
