'use client'
import { motion } from 'motion/react'
import { useRef, useEffect, useState } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

export default function FamilyTree() {
  const chartRef = useRef<HighchartsReact.RefObject>(null)
  const [isModuleLoaded, setIsModuleLoaded] = useState(false)

  useEffect(() => {
    const loadModule = async () => {
      try {
        // Set Highcharts on window
        // @ts-ignore
        window.Highcharts = Highcharts
        
        // Load sankey module FIRST (organization depends on it)
        const sankeyModule = await import('highcharts/modules/sankey')
        // @ts-ignore
        const sankeyInit: any = sankeyModule.default || sankeyModule
        if (typeof sankeyInit === 'function') {
          sankeyInit(Highcharts)
        }
        
        // Then load organization module
        const orgModule = await import('highcharts/modules/organization')
        // @ts-ignore
        const orgInit: any = orgModule.default || orgModule
        if (typeof orgInit === 'function') {
          orgInit(Highcharts)
        }
        
        setIsModuleLoaded(true)
      } catch (error) {
        console.error('Error loading modules:', error)
        setIsModuleLoaded(true)
      }
    }
    
    loadModule()
  }, [])

const VARIANTS_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const VARIANTS_SECTION = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

const TRANSITION_SECTION = {
  duration: 0.3,
}

// Family tree nodes - all unique people
const familyNodes = [
  // Father's side grandparents
  {
    id: 'kgaupi_father_side',
    name: 'Kgaupi',
    title: 'Grandparent',
  },
  {
    id: 'pheladi_father_side',
    name: 'Pheladi',
    title: 'Grandparent',
  },
  // Mother's side grandparents
  {
    id: 'shego_mother_side',
    name: 'Shego',
    title: 'Grandparent',
  },
  {
    id: 'pheladi_mother_side',
    name: 'Pheladi',
    title: 'Grandparent',
  },
  // Parents
  {
    id: 'maredi',
    name: 'Maredi',
    title: 'Father',
  },
  {
    id: 'cylia',
    name: 'Cylia',
    title: 'Mother',
  },
  // Children
  {
    id: 'mogaladi',
    name: 'Mogaladi',
    title: 'Firstborn',
  },
  {
    id: 'nape',
    name: 'Nape',
    title: 'Second',
  },
  {
    id: 'matshweng',
    name: 'Matshweng',
    title: 'Third',
  },
  {
    id: 'kgaupi_child',
    name: 'Kgaupi',
    title: 'Last Born',
  },
  // Partner
  {
    id: 'partner',
    name: 'Partner',
    title: 'Partner',
  },
  // Grandchildren
  {
    id: 'child1',
    name: 'Child 1',
    title: 'Child',
  },
  {
    id: 'child2',
    name: 'Child 2',
    title: 'Child',
  },
]

// Family tree connections
const familyConnections = [
  // Father's side: grandparents to father
  { from: 'kgaupi_father_side', to: 'maredi' },
  { from: 'pheladi_father_side', to: 'maredi' },
  // Mother's side: grandparents to mother
  { from: 'shego_mother_side', to: 'cylia' },
  { from: 'pheladi_mother_side', to: 'cylia' },
  // Parents to children
  { from: 'maredi', to: 'mogaladi' },
  { from: 'cylia', to: 'mogaladi' },
  { from: 'maredi', to: 'nape' },
  { from: 'cylia', to: 'nape' },
  { from: 'maredi', to: 'matshweng' },
  { from: 'cylia', to: 'matshweng' },
  { from: 'maredi', to: 'kgaupi_child' },
  { from: 'cylia', to: 'kgaupi_child' },
  // Matshweng to partner (connection)
  { from: 'matshweng', to: 'partner' },
  // Partner and Matshweng to children
  { from: 'matshweng', to: 'child1' },
  { from: 'partner', to: 'child1' },
  { from: 'matshweng', to: 'child2' },
  { from: 'partner', to: 'child2' },
]

  const chartOptions: Highcharts.Options = {
    chart: {
      height: 1100,
      inverted: true,
      backgroundColor: 'transparent',
      spacing: [20, 20, 20, 20],
    },
    title: {
      text: 'Family Tree',
      style: {
        fontSize: '28px',
        fontWeight: '600',
        color: 'var(--text-color)',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      },
      margin: 30,
    },
    series: [
      {
        type: 'organization',
        name: 'Family Tree',
        keys: ['from', 'to'],
        data: familyConnections,
        levels: [
          {
            level: 0,
            color: '#1f2937',
            dataLabels: {
              color: '#fff',
              style: {
                fontSize: '13px',
                fontWeight: '600',
                textOutline: 'none',
              },
            },
          },
          {
            level: 1,
            color: '#4b5563',
            dataLabels: {
              color: '#fff',
              style: {
                fontSize: '14px',
                fontWeight: '600',
                textOutline: 'none',
              },
            },
          },
          {
            level: 2,
            color: '#6b7280',
            dataLabels: {
              color: '#fff',
              style: {
                fontSize: '13px',
                fontWeight: '600',
                textOutline: 'none',
              },
            },
          },
          {
            level: 3,
            color: '#9ca3af',
            dataLabels: {
              color: '#fff',
              style: {
                fontSize: '13px',
                fontWeight: '600',
                textOutline: 'none',
              },
            },
          },
        ],
        nodes: familyNodes.map((item) => ({
          id: item.id,
          title: item.title,
          name: item.name,
        })),
        colorByPoint: false,
        color: '#000000',
        minLinkWidth: 2,
        linkOpacity: 0.3,
        dataLabels: {
          color: '#fff',
          style: {
            fontSize: '13px',
            fontWeight: '600',
            textOutline: 'none',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          },
          useHTML: true,
        },
        borderColor: 'transparent',
        borderWidth: 0,
        borderRadius: 12,
        nodeWidth: 120,
        nodePadding: 10,
        hangingIndent: 20,
        minNodeLength: 2,
      },
    ],
    tooltip: {
      outside: true,
      useHTML: true,
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      borderColor: 'transparent',
      borderRadius: 8,
      style: {
        color: '#fff',
        fontSize: '13px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      },
      formatter: function (this: any) {
        return `
          <div style="padding: 4px;">
            <strong style="font-size: 14px;">${this.point.name}</strong><br/>
            <span style="opacity: 0.8;">${this.point.title}</span>
          </div>
        `
      },
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      organization: {
        borderColor: 'transparent',
        borderWidth: 0,
        borderRadius: 12,
        minLinkWidth: 2,
        linkOpacity: 0.3,
        states: {
          hover: {
            brightness: 0.2,
            borderColor: 'transparent',
            borderWidth: 0,
          },
        },
      },
    },
  }

  if (!isModuleLoaded) {
    return (
      <motion.main
        className="space-y-24"
        variants={VARIANTS_CONTAINER}
        initial="hidden"
        animate="visible"
      >
        <motion.section
          variants={VARIANTS_SECTION}
          transition={TRANSITION_SECTION}
          aria-labelledby="family-tree-heading"
        >
          <h1
            id="family-tree-heading"
            className="mb-8 text-2xl font-bold text-zinc-800 dark:text-zinc-200"
          >
            Family Tree
          </h1>
          <div className="rounded-lg bg-white p-6 dark:bg-zinc-900/50">
            <div className="flex h-[800px] items-center justify-center">
              <p className="text-zinc-600 dark:text-zinc-400">Loading chart...</p>
            </div>
          </div>
        </motion.section>
      </motion.main>
    )
  }

  return (
    <motion.main
      className="space-y-24"
      variants={VARIANTS_CONTAINER}
      initial="hidden"
      animate="visible"
    >
      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
        aria-labelledby="family-tree-heading"
      >
        <div>
          <HighchartsReact
            ref={chartRef}
            highcharts={Highcharts}
            options={chartOptions}
            constructorType={'chart'}
          />
        </div>
      </motion.section>
    </motion.main>
  )
}

