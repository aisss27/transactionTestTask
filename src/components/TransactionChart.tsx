// components/TransactionChart.tsx
import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables); // Register necessary controllers

type TransactionChartProps = {
    data: number[]
    labels: string[]
    width?: number
    height?:number
};

const TransactionChart: React.FC<TransactionChartProps> = ({ data, labels, width, height }) => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstance = useRef<Chart | null>(null);

    useEffect(() => {
        if (chartInstance.current) {
            // Destroy existing Chart instance
            chartInstance.current.destroy();
        }

        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');

            if (ctx) {
                // Create a new Chart instance
                chartInstance.current = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [
                            {
                                label: 'Transactions',
                                data: data,
                                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                borderColor: 'rgba(75, 192, 192, 1)',
                                borderWidth: 1,
                            },
                        ],
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true,
                            },
                        },
                    },
                });
            }
        }
    }, [data, labels]);

    return <canvas ref={chartRef} height={height} width={width} />;
};

export default TransactionChart;
